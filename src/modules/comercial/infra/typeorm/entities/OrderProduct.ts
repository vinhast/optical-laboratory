import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import Order from './Orders';

@Entity('orders_products')
class OrderProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column()
  initial_price: string;

  @Column()
  single_discount?: string;

  @Column()
  total_discount?: string;

  @Column()
  charged_value: string;

  @Column()
  cashback_value?: string;

  @Column()
  taxes?: string;

  @Column()
  quantity: number;

  @Column()
  wrap?: boolean;

  @Column()
  released?: boolean;

  @Column()
  cfop?: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default OrderProduct;
