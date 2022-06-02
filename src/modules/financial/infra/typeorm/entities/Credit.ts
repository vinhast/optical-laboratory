import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';

@Entity('credits')
class Credit extends MainEntity {
  @Column()
  client_id: number;

  @Column()
  order_id?: number;

  @Column()
  user_id: number;

  @Column()
  description: string;

  @Column()
  value: string;

  @Column()
  date: Date;

  @Column()
  used: string;

  @Column()
  used_at?: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}

export default Credit;
