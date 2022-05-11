import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '@modules/commercial/repositories/IOrdersRepository';
import Order from '@modules/commercial/infra/typeorm/entities/Order';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
  os?: string;
  client_id: number;
  products_value?: string;
  service_value?: string;
  lenses_value?: string;
  charged_value?: string;
  credit_value?: string;
  shipping_method?: string;
  shipping_value?: string;
  shipping_time?: string;
  payment_method?: string;
  payment_date?: Date;
  installments?: number;
  status?: number;
  type: string;
  profit: string;
  note?: string;
  user_id?: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(orderUpdate: IRequest): Promise<Order> {
    const id = orderUpdate.id;
    const cacheKey = `order-get-${id}`;
    let order = await this.cacheProvider.recover<Order | undefined>(cacheKey);

    if (!order) {
      order = await this.ordersRepository.findById(id);
    }

    if (!order) {
      throw new AppError('order not found.', 404);
    }

    order = {
      ...order,
      ...orderUpdate,
    };

    await this.cacheProvider.invalidate(`orders-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.ordersRepository.save(order);

    return order;
  }
}

export default UpdateService;
