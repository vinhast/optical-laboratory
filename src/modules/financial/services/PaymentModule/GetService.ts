import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import PaymentModule from '@modules/financial/infra/typeorm/entities/PaymentModule';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';

@injectable()
class GetService {
  constructor(
    @inject('PaymentModulesRepository')
    private paymentModulesRepository: IPaymentModulesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<PaymentModule> {
    const cacheKey = `payment-module-get-${id}`;
    let paymentModule = await this.cacheProvider.recover<
      PaymentModule | undefined
    >(cacheKey);

    if (!paymentModule) {
      paymentModule = await this.paymentModulesRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(paymentModule));
    }

    if (!paymentModule) {
      throw new AppError('Payment Module not found.', 404);
    }

    return paymentModule;
  }
}

export default GetService;
