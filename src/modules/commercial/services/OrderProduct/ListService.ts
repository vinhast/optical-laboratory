import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import OrderProduct from '@modules/commercial/infra/typeorm/entities/OrderProduct';

@injectable()
class ListService {
  constructor(
    @inject('OrderProductsRepository')
    private orderProductsRepository: IOrderProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<OrderProduct[]> {
    const cacheKey = `order-products-list`;
    let orderProduct = await this.cacheProvider.recover<OrderProduct[]>(
      cacheKey,
    );
    if (!orderProduct) {
      orderProduct = await this.orderProductsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(orderProduct));
    }

    return orderProduct;
  }
}

export default ListService;
