import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';

@injectable()
class GetService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<PaymentGateway> {
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

    return paymentGateway;
  }
}

export default GetService;
