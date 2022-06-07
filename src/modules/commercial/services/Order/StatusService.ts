import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '@modules/commercial/repositories/IOrdersRepository';
import Order from '@modules/commercial/infra/typeorm/entities/Order';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class StatusService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number, status: number): Promise<Order> {
    const cacheKey = `order-get-${id}`;
    let order = await this.cacheProvider.recover<Order | undefined>(cacheKey);

    if (!order) {
      order = await this.ordersRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(order));
    }
    if (!order) {
      throw new AppError('Order not found.', 404);
    }
    const orderStatus = await this.ordersRepository.updateStatus(order, status);
    await this.cacheProvider.invalidate(`orders-list`);
    await this.cacheProvider.invalidate(cacheKey);
    await this.cacheProvider.invalidatePrefix(`product-category-get`);

    return orderStatus;
  }
}

export default StatusService;
