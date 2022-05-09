import { getRepository, Repository } from 'typeorm';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import ICreateOrderProductsDTO from '@modules/commercial/dtos/ICreateOrderProductDTO';
import OrderProducts from '../entities/OrderProduct';

class OrderProductsRepository implements IOrderProductsRepository {
  private ormRepository: Repository<OrderProducts>;

  constructor() {
    this.ormRepository = getRepository(OrderProducts);
  }

  public async findAll(): Promise<OrderProducts[]> {
    const orderProducts = await this.ormRepository.find();
    return orderProducts;
  }

  public async findById(id: number): Promise<OrderProducts | undefined> {
    const orderProducts = await this.ormRepository.findOne(id);
    return orderProducts;
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
