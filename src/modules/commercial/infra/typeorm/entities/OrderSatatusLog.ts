import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('orders_status_logs')
class OrderSatatusLog extends MainEntity {
  @Column()
  order_id: number;

  @Column()
  user_id?: number;

  @Column()
  status: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}

export default OrderSatatusLog;
