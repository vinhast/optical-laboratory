import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import OrderProduct from '@modules/commercial/infra/typeorm/entities/OrderProduct';

@injectable()
class GetService {
  constructor(
    @inject('OrderProductsRepository')
    private orderProductsRepository: IOrderProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<OrderProduct> {
    const cacheKey = `order-product-get-${id}`;
    let orderProduct = await this.cacheProvider.recover<
      OrderProduct | undefined
    >(cacheKey);

    if (!orderProduct) {
      orderProduct = await this.orderProductsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(orderProduct));
    }

    if (!orderProduct) {
      throw new AppError('Order product not found.', 404);
    }

    return orderProduct;
  }
}

export default GetService;
