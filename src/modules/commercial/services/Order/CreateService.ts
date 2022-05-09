import { inject, injectable } from 'tsyringe';

import IOrderRepository from '@modules/commercial/repositories/IOrderRepository';
import Order from '@modules/commercial/infra/typeorm/entities/Order';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
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
class CreateService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
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
    const order = await this.orderRepository.create({
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
    });

    await this.cacheProvider.invalidatePrefix('order-list');

    return order;
  }
}

export default CreateService;
