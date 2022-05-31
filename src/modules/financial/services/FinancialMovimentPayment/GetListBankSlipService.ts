import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import IBankApiProvider, {
  IParams,
  IResponseListBankSlip,
} from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import moment from 'moment';

interface IRequest {
  payment_gateway_id?: number;
  paymentGateway?: PaymentGateway;
  params: IParams;
}

@injectable()
class GetListBankSlipService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('BankApiProvider')
    private bankApiProvider: IBankApiProvider,
  ) {}

  public async execute(
    data: IRequest,
  ): Promise<IResponseListBankSlip | undefined> {
    const id = data.payment_gateway_id
      ? data.payment_gateway_id
      : data.paymentGateway?.id;
    const cacheKey = `payment-gateway-get-${id}`;
    let paymentGateway = data.payment_gateway_id
      ? await this.cacheProvider.recover<PaymentGateway | undefined>(cacheKey)
      : data.paymentGateway;
    if (!paymentGateway && id) {
      paymentGateway = await this.paymentGatewaysRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(paymentGateway));
    }

    if (!paymentGateway) {
      throw new AppError('Payment Gateway not found.', 404);
    }

    const bankModule = await this.bankApiProvider.getBankModule(
      paymentGateway.payment_module_id,
    );
    if (bankModule) {
      const bankSlipPDf = await bankModule.getListBankSlip(
        paymentGateway.credentials,
        data.params,
      );
      return bankSlipPDf;
    }

    return undefined;
  }
}

export default GetListBankSlipService;
