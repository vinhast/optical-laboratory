import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Client from './Client';
import OrderProduct from './OrderProduct';

@Entity('stocks_moviments')
class StockMoviment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_id: number;

  @Column()
  order_id?: number;

  @Column()
  financial_moviment_id?: number;

  @Column()
  user_id: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  origin: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
  orders_products: OrderProduct[];
}

export default StockMoviment;
