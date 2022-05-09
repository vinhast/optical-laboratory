import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IOrderRepository from '@modules/commercial/repositories/IOrderRepository';
import Order from '@modules/commercial/infra/typeorm/entities/Order';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Order> {
    const cacheKey = `order-get-${id}`;
    let order = await this.cacheProvider.recover<Order | undefined>(cacheKey);

    if (!order) {
      order = await this.orderRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(order));
    }

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    return order;
  }
}

export default GetService;
