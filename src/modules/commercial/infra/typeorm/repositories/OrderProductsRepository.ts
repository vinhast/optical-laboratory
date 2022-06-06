import { getRepository, Repository } from 'typeorm';
import httpContext from 'express-http-context';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICreateOrderProductsDTO from '@modules/commercial/dtos/ICreateOrderProductDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import OrderProducts from '../entities/OrderProduct';

class OrderProductsRepository
  extends MainRepository
  implements IOrderProductsRepository
{
  private ormRepository: Repository<OrderProducts>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(OrderProducts);
    super(repository);
    this.ormRepository = repository;
  }

  public async findByOrder(
    order_id: number,
  ): Promise<OrderProducts[] | undefined> {
    this.userData = httpContext.get('user');
    const orderProducts = await this.ormRepository.find({
      where: {
        order_id,
        client_application_id: this.userData.client_application_id,
      },
      relations: ['product'],
    });
    return orderProducts;
  }

  public async create(
    orderProductsData: ICreateOrderProductsDTO,
  ): Promise<OrderProducts> {
    const orderProducts = this.ormRepository.create(orderProductsData);

    await this.ormRepository.save(orderProducts);

    return orderProducts;
  }

  public save(orderProducts: OrderProducts): Promise<OrderProducts> {
    return this.ormRepository.save(orderProducts);
  }
}

export default OrderProductsRepository;
