import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import User from '@modules/users/infra/typeorm/entities/User';
import Client from './Client';
import OrderProduct from './OrderProduct';

@Entity('orders')
class Order extends MainEntity {
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  client: Client;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
  orders_products: OrderProduct[];
}

export default Order;
