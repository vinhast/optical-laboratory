import Order from '@modules/commercial/infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | undefined>;
  findByName(name: string): Promise<Order | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  setEmailSituation(id: number, value: number): Promise<void>;
  delete(id: number): Promise<void>;
}
