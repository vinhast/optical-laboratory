import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';
import PaymentModule from '@modules/financial/infra/typeorm/entities/PaymentModule';

@injectable()
class ListService {
  constructor(
    @inject('PaymentModulesRepository')
    private paymentModulesRepository: IPaymentModulesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<PaymentModule[]> {
    const cacheKey = `payment-modules-list`;
    let paymentModules;

    if (!paymentModules) {
      paymentModules = await this.paymentModulesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(paymentModules));
    }

    return paymentModules;
  }
}

export default ListService;
