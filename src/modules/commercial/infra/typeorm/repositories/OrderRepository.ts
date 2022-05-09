import { getRepository, Repository } from 'typeorm';
import httpContext from 'express-http-context';

import IOrderRepository from '@modules/commercial/repositories/IOrderRepository';
import ICreateOrderDTO from '@modules/commercial/dtos/ICreateOrderDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import Order from '../entities/Order';

class OrderRepository extends MainRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(Order);
    super(repository);
    this.ormRepository = repository;
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

export default OrderRepository;
