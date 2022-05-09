import { getRepository, Repository } from 'typeorm';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICreateOrderProductsDTO from '@modules/commercial/dtos/ICreateOrderProductDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import OrderProducts from '../entities/OrderProduct';

class OrderProductsRepository
  extends MainRepository
  implements IOrderProductsRepository
{
  private ormRepository: Repository<OrderProducts>;

  constructor() {
    const repository = getRepository(OrderProducts);
    super(repository);
    this.ormRepository = repository;
  }

  public async findByOrder(
    order_id: number,
  ): Promise<OrderProducts[] | undefined> {
    const orderProducts = await this.ormRepository.find({
      where: {
        order_id,
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

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default OrderProductsRepository;
