import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/commercial/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/commercial/dtos/ICreateOrderDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import Order from '../entities/Order';

class OrdersRepository extends MainRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    const repository = getRepository(Order);
    super(repository);
    this.ormRepository = repository;
  }

  public async setEmailSituation(id: number, value: number): Promise<void> {
    await this.ormRepository.save({
      id,
      email_situation: value,
    });
  }

  public async findByParentId(parent_id: number): Promise<Order[]> {
    const order = await this.ormRepository.find({
      where: { parent_id },
    });
    return order;
  }

  public async findByName(name: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(name);
    return order;
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(orderData);

    await this.ormRepository.save(order);

    return order;
  }

  public save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default OrdersRepository;
