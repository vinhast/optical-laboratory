import { inject, injectable } from 'tsyringe';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('OrderProductsRepository')
    private orderProductsRepository: IOrderProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const orderProduct = await this.orderProductsRepository.findById(id);

    if (!orderProduct) {
      throw new AppError('Order product not found.', 404);
    }

    await this.cacheProvider.invalidate(`order-product-list`);

    await this.orderProductsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
