import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IOrderRepository from '@modules/commercial/repositories/IOrderRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Order from '../../infra/typeorm/entities/Order';

@injectable()
class ListService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Order[]> {
    const cacheKey = `order-list`;
    let order = await this.cacheProvider.recover<Order[]>(cacheKey);

    order = await this.orderRepository.findAll();
    if (!order) {
      await this.cacheProvider.save(cacheKey, classToClass(order));
    }

    return order;
  }
}

export default ListService;
