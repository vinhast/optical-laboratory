import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ClientApplication from './ClientApplication';

@Entity('audit_logs')
class AuditLog {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  client_application_id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ClientApplication)
  @JoinColumn({ name: 'client_application_id' })
  clientApplication: ClientApplication;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}

export default AuditLog;
