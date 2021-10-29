import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Client from './Client';
import OrderProduct from './OrderProduct';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  os?: string;

  @Column()
  client_id: number;

  @Column()
  products_value?: string;

  @Column()
  service_value?: string;

  @Column()
  lenses_value?: string;

  @Column()
  charged_value?: string;

  @Column()
  credit_value?: string;

  @Column()
  shipping_method?: string;

  @Column()
  shipping_value?: string;

  @Column()
  shipping_time?: string;

  @Column()
  payment_method?: string;

  @Column()
  payment_date?: Date;

  @Column()
  installments?: number;

  @Column()
  status?: number;

  @Column()
  type: string;

  @Column()
  profit: string;

  @Column()
  note?: string;

  @Column()
  user_id?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
  orders_products: OrderProduct[];
}

export default Order;
