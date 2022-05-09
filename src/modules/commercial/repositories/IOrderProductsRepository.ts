import ICreateOrderProductDTO from '@modules/commercial/dtos/ICreateOrderProductDTO';
import OrderProduct from '@modules/commercial/infra/typeorm/entities/OrderProduct';

export default interface IOrderProductsRepository {
  findAll(): Promise<OrderProduct[]>;
  findById(id: number): Promise<OrderProduct | undefined>;
  findByOrder(order_id: number): Promise<OrderProduct[] | undefined>;
  create(data: ICreateOrderProductDTO): Promise<OrderProduct>;
  save(OrderProduct: OrderProduct): Promise<OrderProduct>;
  delete(id: number): Promise<void>;
}
