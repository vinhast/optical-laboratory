import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';
import Permission from './Permission';

@Entity('clients_applications_users')
class ClientApplicationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_application_id: number;

  @Column()
  role_id?: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  active: boolean;

  @Column()
  token?: string;

  @Column()
  token_validate?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id', referencedColumnName: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  role_permissions: Permission[];

  @ManyToOne(() => ClientApplication)
  @JoinColumn({ name: 'client_application_id' })
  clientApplication: ClientApplication;
}

export default ClientApplicationUser;
