import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('PaymentModulesRepository')
    private paymentModulesRepository: IPaymentModulesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const paymentModule = await this.paymentModulesRepository.findById(id);

    if (!paymentModule) {
      throw new AppError('Payment Module not found.', 404);
    }

    await this.cacheProvider.invalidate(`payment-modules-list`);
    await this.cacheProvider.invalidate(`payment-module-get-${id}`);

    await this.paymentModulesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
