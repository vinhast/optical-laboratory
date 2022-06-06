import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';
import PaymentModule from '@modules/financial/infra/typeorm/entities/PaymentModule';

interface IRequest {
  id: number;
  type: 'Boleto';
  module: string;
  name: string;
  fields: any;
}

@injectable()
class UpdateService {
  constructor(
    @inject('PaymentModulesRepository')
    private paymentModulesRepository: IPaymentModulesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(paymentModuleUpdate: IRequest): Promise<PaymentModule> {
    const id = paymentModuleUpdate.id;
    const cacheKey = `payment-module-get-${id}`;
    let paymentModule = await this.cacheProvider.recover<
      PaymentModule | undefined
    >(cacheKey, true);

    if (!paymentModule) {
      paymentModule = await this.paymentModulesRepository.findById(id);
    }

    if (!paymentModule) {
      throw new AppError('Payment Module not found.', 404);
    }

    paymentModule = {
      ...paymentModule,
      ...paymentModuleUpdate,
    };

    await this.cacheProvider.invalidate(`payment-Modules-list`, true);

    await this.cacheProvider.invalidate(cacheKey, true);

    await this.paymentModulesRepository.save(paymentModule);

    return paymentModule;
  }
}

export default UpdateService;
