import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

@Entity('audit_logs')
class AuditLog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @Column()
  entity: string;

  @Column()
  entity_id: string;

  @Column()
  descriptions?: string;

  @Column()
  changes?: string;

  @Column()
  user_id: number;

  @Column()
  client_application_user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => ClientApplicationUser)
  @JoinColumn({
    name: 'client_application_user_id',
    referencedColumnName: 'id',
  })
  clientApplicationUser: ClientApplicationUser;
}

export default AuditLog;
