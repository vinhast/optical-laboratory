import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import ICreateFinancialMovimentDTO from '@modules/financial/dtos/ICreateFinancialMovimentDTO';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import httpContext from 'express-http-context';
import moment from 'moment';
import IBankApiProvider, {
  IBankApiResponse,
} from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';

interface IRequest extends ICreateFinancialMovimentDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('FinancialMovimentsRepository')
    private financialMovimentsRepository: IFinancialMovimentsRepository,
    @inject('FinancialMovimentsPaymentsRepository')
    private financialMovimentsPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('BankApiProvider')
    private bankApiProvider: IBankApiProvider,
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
  ) {}

  public async execute(
    financialMovimentUpdate: IRequest,
  ): Promise<FinancialMoviment> {
    const id = financialMovimentUpdate.id;
    let bankModule: IBankApiResponse | undefined;
    const copyFinancialMovimentUpdate = { ...financialMovimentUpdate };
    const cacheKey = `financial-moviment-get-${id}`;
    let financialMoviment = await this.cacheProvider.recover<
      FinancialMoviment | undefined
    >(cacheKey);

    if (!financialMoviment) {
      financialMoviment = await this.financialMovimentsRepository.findById(id);
    }

    if (!financialMoviment) {
      throw new AppError('FinancialMoviment not found.', 404);
    }

    delete financialMoviment.financialCategory;
    delete financialMoviment.provider;

    if (!financialMoviment.due_date) {
      throw new AppError('Due date is invalid date');
    }
    const [oldDay, oldMonth, oldYear] = `${financialMoviment.due_date}`.split(
      '/',
    );
    const oldDueDate = `${oldYear}-${oldMonth}-${oldDay}`;
    let dueDate;
    if (`${financialMovimentUpdate.due_date}`.includes('/')) {
      const [day, month, year] = `${financialMovimentUpdate.due_date}`.split(
        '/',
      );
      dueDate = `${year}-${month}-${day}`;
    } else {
      dueDate = `${financialMovimentUpdate.due_date}`.split('T')[0];
    }

    if (
      financialMovimentUpdate.due_date &&
      !moment(dueDate).isSame(oldDueDate)
    ) {
      const financialMovimentPayment =
        await this.financialMovimentsPaymentsRepository.findByFinancialMovimentId(
          id,
        );
      if (financialMovimentPayment) {
        financialMovimentPayment.situation = 'Cancelled';
        await this.financialMovimentsPaymentsRepository.save(
          financialMovimentPayment,
        );
      }
      if (financialMoviment.paymentGateway) {
        bankModule = await this.bankApiProvider.getBankModule(
          financialMoviment.paymentGateway.payment_module_id,
        );
        if (!bankModule) {
          throw new AppError('Bank module not found.', 404);
        }
        if (!financialMoviment.due_date) {
          throw new AppError('Due date is invalid date');
        }
        if (financialMovimentPayment) {
          await bankModule.cancelBankSlip({
            cancellationReason: 'APEDIDODOCLIENTE',
            credentials: financialMoviment.paymentGateway.credentials,
            ourNumber: financialMovimentPayment.document_number,
          });
        }
        const createBankSlip = await bankModule?.createBankSlip(
          financialMoviment.paymentGateway.credentials,
          {
            seuNumero: financialMoviment.paymentGateway.credentials.your_number,
            valorNominal: Number(financialMoviment.value),
            dataVencimento: dueDate,
            numDiasAgenda: Number(0),
            pagador: {
              cpfCnpj: `${financialMoviment.client?.cnpj}`,
              tipoPessoa: 'JURIDICA',
              nome: `${financialMoviment.client?.company_name}`,
              endereco: `${financialMoviment.client?.street}`,
              cidade: `${financialMoviment.client?.city}`,
              uf: `${financialMoviment.client?.state}`,
              cep: `${financialMoviment.client?.zip_code}`,
            },
          },
        );

        if (!createBankSlip) {
          throw new AppError('Bank slip was not created');
        }
        const copyPaymentGateway = {
          ...financialMoviment.paymentGateway,
        };
        copyPaymentGateway.credentials.your_number =
          Number(financialMoviment.paymentGateway.credentials.your_number) + 1;
        await this.paymentGatewaysRepository.save(copyPaymentGateway);

        await this.financialMovimentsPaymentsRepository.create({
          bar_code: createBankSlip.codigoBarras,
          digitable_line: createBankSlip.linhaDigitavel,
          document_number: createBankSlip.nossoNumero,
          due_date: new Date(moment(dueDate).format('YYYY-MM-DDTHH:mm:ss[Z]')),
          financial_moviment_id: id,
          payment_method: financialMoviment.payment_method,
          situation: 'Awaiting payment',
          payment_gateway_id: financialMoviment.payment_gateway_id,
        });
      }
    }

    if (financialMovimentUpdate.finished === 'S') {
      const user: {
        id: number;
      } = httpContext.get('user');
      copyFinancialMovimentUpdate.downloaded_user_id = user?.id;
      copyFinancialMovimentUpdate.downloaded_at = new Date(
        moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      );
    }

    await this.cacheProvider.invalidate(`financial-moviments-list`);
    await this.cacheProvider.invalidate(cacheKey);
    await this.financialMovimentsRepository.save({
      ...financialMoviment,
      ...copyFinancialMovimentUpdate,
    });

    if (financialMovimentUpdate.downloaded_at) {
      const financialMovimentPayment =
        await this.financialMovimentsPaymentsRepository.findByFinancialMovimentId(
          id,
        );
      if (financialMovimentPayment?.situation === 'Awaiting payment') {
        financialMovimentPayment.situation = 'Cancelled';
        if (financialMovimentPayment.payment_method === 'B') {
          if (financialMoviment.paymentGateway) {
            bankModule = await this.bankApiProvider.getBankModule(
              financialMoviment.paymentGateway.payment_module_id,
            );
            if (!bankModule) {
              throw new AppError('Bank module not found.', 404);
            }
            if (!financialMoviment.due_date) {
              throw new AppError('Due date is invalid date');
            }
            await bankModule.cancelBankSlip({
              cancellationReason: 'PAGODIRETOAOCLIENTE',
              credentials: financialMoviment.paymentGateway.credentials,
              ourNumber: financialMovimentPayment.document_number,
            });
          }
        }

        await this.financialMovimentsPaymentsRepository.save(
          financialMovimentPayment,
        );
      }
      await this.financialMovimentsPaymentsRepository.create({
        due_date: new Date(moment(oldDueDate).format('YYYY-MM-DDTHH:mm:ss[Z]')),
        financial_moviment_id: id,
        payment_method: `${financialMovimentUpdate.payment_method}`,
        situation: 'Paid',
        payment_date: new Date(
          moment(financialMovimentUpdate.downloaded_at).format(
            'YYYY-MM-DDTHH:mm:ss[Z]',
          ),
        ),
      });
    }

    return financialMoviment;
  }
}

export default UpdateService;
