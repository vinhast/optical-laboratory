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

  public async execute({
    id,
    os,
    client_id,
    products_value,
    service_value,
    lenses_value,
    charged_value,
    credit_value,
    shipping_method,
    shipping_value,
    shipping_time,
    payment_method,
    payment_date,
    installments,
    status,
    type,
    profit,
    note,
    user_id,
  }: IRequest): Promise<Order> {
    const cacheKey = `order-get-${id}`;
    let order = await this.cacheProvider.recover<Order | undefined>(cacheKey);

    if (!order) {
      order = await this.ordersRepository.findById(id);
    }

    if (!order) {
      throw new AppError('order not found.', 404);
    }

    order.os = os;
    order.client_id = client_id;
    order.products_value = products_value;
    order.service_value = service_value;
    order.lenses_value = lenses_value;
    order.charged_value = charged_value;
    order.credit_value = credit_value;
    order.shipping_method = shipping_method;
    order.shipping_value = shipping_value;
    order.shipping_time = shipping_time;
    order.payment_method = payment_method;
    order.payment_date = payment_date;
    order.installments = installments;
    order.status = status;
    order.type = type;
    order.profit = profit;
    order.note = note;
    order.user_id = user_id;

    await this.cacheProvider.invalidate(`orders-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.ordersRepository.save(order);

    return order;
  }
}

export default UpdateService;
