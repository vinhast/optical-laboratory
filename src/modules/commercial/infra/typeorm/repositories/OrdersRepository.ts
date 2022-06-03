/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getRepository, Repository } from 'typeorm';
import httpContext from 'express-http-context';

import IOrdersRepository from '@modules/commercial/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/commercial/dtos/ICreateOrderDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import StockMoviment from '@modules/warehouse/infra/typeorm/entities/StockMoviment';
import Order from '../entities/Order';
import OrderProduct from '../entities/OrderProduct';
import OrderSatatusLog from '../entities/OrderSatatusLog';

class OrdersRepository extends MainRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;
  private ormOrdersProductsRepository: Repository<OrderProduct>;
  private ormStocksMovimentsRepository: Repository<StockMoviment>;
  private ormOrdersStatusLogsRepository: Repository<OrderSatatusLog>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(Order);
    super(repository);
    this.ormRepository = repository;
    this.ormOrdersProductsRepository = getRepository(OrderProduct);
    this.ormStocksMovimentsRepository = getRepository(StockMoviment);
    this.ormOrdersStatusLogsRepository = getRepository(OrderSatatusLog);
    this.userData = httpContext.get('user');
  }

  public async setEmailSituation(id: number, value: number): Promise<void> {
    await this.ormRepository.save({
      id,
      email_situation: value,
    });
  }

  public async findByParentId(parent_id: number): Promise<Order[]> {
    const order = await this.ormRepository.find({
      where: {
        parent_id,
        client_application_id: this.userData.client_application_id,
      },
    });
    return order;
  }

  public async updateStatus(order: Order, status: number): Promise<Order> {
    const updatedOrder = await this.ormRepository.save({
      ...order,
      status,
    });
    await this.ormOrdersStatusLogsRepository.save({
      order_id: order.id,
      user_id: this.userData.id,
      status,
    });
    if ([2, 3, 4].includes(status)) {
      const ordersProducts = await this.ormOrdersProductsRepository.find({
        order_id: order.id,
        client_application_id: this.userData.client_application_id,
      });
      for (const orderP of ordersProducts) {
        await this.ormStocksMovimentsRepository.save({
          order_id: order.id,
          product_id: orderP.product_id,
          user_id: this.userData.id,
          financial_moviment_id: 0,
          description: 'D',
          type: 'D',
          origin: 'P',
          quantity: orderP.quantity,
        });
      }
    }
    return updatedOrder;
  }

  public async findById(id: number): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id: this.userData.client_application_id,
      },
    });
    const orders_products = await this.ormOrdersProductsRepository.find({
      order_id: order?.id,
      client_application_id: this.userData.client_application_id,
    });

    return order ? { ...order, orders_products } : undefined;
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      ...orderData,
      status: 1, // em aberto
    });
    await this.ormRepository.save(order);
    await this.ormOrdersStatusLogsRepository.save({
      order_id: order.id,
      user_id: this.userData.id,
      status: 1,
    });
    if (orderData.products.length) {
      for (const orderP of orderData.products) {
        await this.ormOrdersProductsRepository.save({
          order_id: order.id,
          ...orderP,
        });
      }
    }

    return order;
  }

  public save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }
}

export default OrdersRepository;
