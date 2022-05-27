import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import IBankApiProvider, {
  IResponseListBankSlip,
} from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';

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
    payment_gateway_id: number,
  ): Promise<IResponseListBankSlip | undefined> {
    const id = payment_gateway_id;
    const cacheKey = `payment-gateway-get-${id}`;
    let paymentGateway;

    if (!paymentGateway) {
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
      );
      return bankSlipPDf;
    }

    return undefined;
  }
}

export default GetListBankSlipService;
