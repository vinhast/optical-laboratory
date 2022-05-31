import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';

@injectable()
class ListByClientApplicationService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    client_application_id: number,
  ): Promise<PaymentGateway[]> {
    const cacheKey = `payment-gateways-list`;
    let paymentGateways = await this.cacheProvider.recover<
      PaymentGateway[] | undefined
    >(cacheKey);

    if (!paymentGateways) {
      paymentGateways =
        await this.paymentGatewaysRepository.findAllByClientApplication(
          client_application_id,
        );
      await this.cacheProvider.save(cacheKey, classToClass(paymentGateways));
    }

    return paymentGateways;
  }
}

export default ListByClientApplicationService;
