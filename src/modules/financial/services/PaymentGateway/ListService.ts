import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';

@injectable()
class ListService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<PaymentGateway[]> {
    const cacheKey = `payment-gateways-list`;
    let paymentGateways;

    if (!paymentGateways) {
      paymentGateways = await this.paymentGatewaysRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(paymentGateways));
    }

    return paymentGateways;
  }
}

export default ListService;
