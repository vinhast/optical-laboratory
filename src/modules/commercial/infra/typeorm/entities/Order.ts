import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import User from '@modules/users/infra/typeorm/entities/User';
import moment from 'moment';
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

  @Column({
    transformer: {
      from: value => {
        return moment(value).format('DD/MM/YYYY');
      },
      to: value => value,
    },
  })
  shipping_time?: string;

  @Column()
  payment_method?: string;

  @Column()
  payment_date?: Date;

  @Column()
  installments?: number;

  @Column({
    type: 'enum',
    enum: ['Open', 'Accomplished', 'Separated', 'Sent', 'Finished'],
    transformer: {
      from: value => {
        const statusTransform: any = {
          Accomplished: 'Realizado',
          Separated: 'Separado',
          Sent: 'Enviado',
          Open: 'Em Aberto',
          Finished: 'Finalizado',
        };
        return statusTransform[value];
      },
      to: value => value,
    },
  })
  status?: 'Open' | 'Accomplished' | 'Separated' | 'Sent' | 'Finished';

  @Column({
    transformer: {
      from: value => {
        const typesTransform: any = {
          V: 'Venda',
          B: 'Venda para Beneficiação',
          S: 'Venda para Saldo',
        };
        return typesTransform[value];
      },
      to: value => value,
    },
  })
  type: string;

  @Column({
    transformer: {
      from: value => {
        const profitTransform: any = {
          S: 'Sim',
          N: 'Não',
        };
        return profitTransform[value];
      },
      to: value => value,
    },
  })
  profit: string;

  @Column()
  note?: string;

  @Column()
  user_id?: number;

  @Column()
  revenue?: string;

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
  ordersProducts: OrderProduct[];
}

export default Order;
