import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IOrdersRepository from '@modules/commercial/repositories/IOrdersRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Order from '../../infra/typeorm/entities/Order';

@injectable()
class ListService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Order[]> {
    const cacheKey = `order-list`;
    let order = await this.cacheProvider.recover<Order[]>(cacheKey);

    if (!order) {
      order = await this.ordersRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(order));
    }

    return order;
  }
}

export default ListService;
