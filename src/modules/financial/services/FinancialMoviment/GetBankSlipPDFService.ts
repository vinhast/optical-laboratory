import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import IBankApiProvider from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';

@injectable()
class GetBankSlipPDFService {
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
    ourNumber: string,
  ): Promise<string> {
    const id = payment_gateway_id;
    const cacheKey = `payment-gateway-get-${id}`;
    let paymentGateway = await this.cacheProvider.recover<
      PaymentGateway | undefined
    >(cacheKey);

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
      const bankSlipPDf = await bankModule.getBankSlipPDF(
        paymentGateway.credentials,
        ourNumber,
      );
      return bankSlipPDf;
    }

    return '';
  }
}

export default GetBankSlipPDFService;
