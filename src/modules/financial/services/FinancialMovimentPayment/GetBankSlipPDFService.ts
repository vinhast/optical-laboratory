import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import IBankApiProvider, {
  IBankApiResponse,
} from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import moment from 'moment';

@injectable()
class GetBankSlipPDFService {
  constructor(
    @inject('FinancialMovimentsRepository')
    private financialMovimentsRepository: IFinancialMovimentsRepository,
    @inject('FinancialMovimentsPaymentsRepository')
    private financialMovimentsPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('BankApiProvider')
    private bankApiProvider: IBankApiProvider,
  ) {}

  public async execute(
    financial_moviment_id: number,
  ): Promise<string | undefined> {
    const id = financial_moviment_id;
    const cacheKey = `financial-moviment-get-${id}`;
    let bankSlip;
    let bankModule: IBankApiResponse | undefined;
    let financialMoviment = await this.cacheProvider.recover<
      FinancialMoviment | undefined
    >(cacheKey);

    if (!financialMoviment) {
      financialMoviment = await this.financialMovimentsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(financialMoviment));
    }

    if (!financialMoviment) {
      throw new AppError('financialMoviment not found.', 404);
    }

    let paymentGateway;
    if (financialMoviment.payment_gateway_id) {
      paymentGateway = await this.paymentGatewaysRepository.findById(
        financialMoviment.payment_gateway_id,
      );
    }
    if (!paymentGateway) {
      throw new AppError('Payment Gateway not found.', 404);
    }

    const financialMovimentPayment =
      await this.financialMovimentsPaymentsRepository.findByFinancialMovimentId(
        id,
      );
    if (financialMovimentPayment) {
      bankModule = await this.bankApiProvider.getBankModule(
        paymentGateway.payment_module_id,
      );
      if (!bankModule) {
        throw new AppError('Bank module not found.', 404);
      }
      if (financialMovimentPayment.situation === 'Cancelled') {
        if (!bankModule) {
          throw new AppError('Bank module not found.', 404);
        }
        if (!financialMoviment.due_date) {
          throw new AppError('Due date is invalid date');
        }
        const [day, month, year] = `${financialMoviment.due_date}`.split('/');
        const dueDate = `${year}-${month}-${day}`;
        const createBankSlip = await bankModule?.createBankSlip(
          paymentGateway.credentials,
          {
            seuNumero: paymentGateway.credentials.your_number,
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
        paymentGateway.credentials.your_number =
          Number(paymentGateway.credentials.your_number) + 1;
        await this.paymentGatewaysRepository.save(paymentGateway);
        await this.financialMovimentsPaymentsRepository.create({
          bar_code: createBankSlip.codigoBarras,
          digitable_line: createBankSlip.linhaDigitavel,
          document_number: createBankSlip.nossoNumero,
          due_date: new Date(moment(dueDate).format('YYYY-MM-DDTHH:mm:ss[Z]')),
          financial_moviment_id,
          payment_method: financialMoviment.payment_method,
          situation: 'Awaiting payment',
          payment_gateway_id: financialMoviment.payment_gateway_id,
        });
        bankSlip = await bankModule?.getBankSlipPDF(
          paymentGateway.credentials,
          createBankSlip.nossoNumero,
        );
      } else {
        bankSlip = await bankModule?.getBankSlipPDF(
          paymentGateway.credentials,
          financialMovimentPayment.document_number,
        );
      }
    } else {
      if (!bankModule) {
        throw new AppError('Bank module not found.', 404);
      }
      if (!financialMoviment.due_date) {
        throw new AppError('Due date is invalid date');
      }
      const [day, month, year] = `${financialMoviment.due_date}`.split('/');
      const dueDate = `${year}-${month}-${day}`;
      const createBankSlip = await bankModule?.createBankSlip(
        paymentGateway.credentials,
        {
          seuNumero: paymentGateway.credentials.your_number,
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
      paymentGateway.credentials.your_number =
        Number(paymentGateway.credentials.your_number) + 1;
      await this.paymentGatewaysRepository.save(paymentGateway);
      await this.financialMovimentsPaymentsRepository.create({
        bar_code: createBankSlip.codigoBarras,
        digitable_line: createBankSlip.linhaDigitavel,
        document_number: createBankSlip.nossoNumero,
        due_date: new Date(moment(dueDate).format('YYYY-MM-DDTHH:mm:ss[Z]')),
        financial_moviment_id,
        payment_method: financialMoviment.payment_method,
        situation: 'Awaiting payment',
        payment_gateway_id: financialMoviment.payment_gateway_id,
      });
      bankSlip = await bankModule?.getBankSlipPDF(
        paymentGateway.credentials,
        createBankSlip.nossoNumero,
      );
    }
    return bankSlip;
  }
}

export default GetBankSlipPDFService;
