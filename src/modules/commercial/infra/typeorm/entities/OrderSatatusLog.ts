import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

@Entity('orders_status_logs')
class OrderSatatusLog extends MainEntity {
  @Column()
  order_id: number;

  @Column()
  client_application_user_id: number;

  @Column()
  status: number;

  @ManyToOne(() => ClientApplicationUser)
  @JoinColumn({
    name: 'client_application_user_id',
    referencedColumnName: 'id',
  })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  clientApplicationUser: ClientApplicationUser;
}

export default OrderSatatusLog;
