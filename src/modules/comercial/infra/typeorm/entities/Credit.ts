import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('credits')
class Credit {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Credit;
