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
import ClientApplicationRole from './ClientApplicationRole';
import ClientApplicationPermission from './ClientApplicationPermission';

@Entity('clients_applications_users')
class ClientApplicationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_application_id: number;

  @Column()
  client_application_role_id: number;

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

  @ManyToOne(() => ClientApplicationRole)
  @JoinColumn({
    name: 'client_application_role_id',
    referencedColumnName: 'id',
  })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  clientApplicationRole?: ClientApplicationRole;

  @ManyToMany(() => ClientApplicationPermission)
  @JoinTable({
    name: 'permissions_clients_application_users',
    joinColumns: [
      { name: 'client_application_user_id', referencedColumnName: 'id' },
    ],
    inverseJoinColumns: [{ name: 'client_application_permission_id' }],
  })
  clientApplicationUserPermissions?: ClientApplicationPermission[];

  @ManyToMany(() => ClientApplicationPermission)
  @JoinTable({
    name: 'permissions_clients_application_roles',
    joinColumns: [
      {
        name: 'client_application_role_id',
        referencedColumnName: 'client_application_role_id',
      },
    ],
    inverseJoinColumns: [{ name: 'client_application_permission_id' }],
  })
  clientApplicationRolePermissions?: ClientApplicationPermission[];

  @ManyToOne(() => ClientApplication)
  @JoinColumn({ name: 'client_application_id', referencedColumnName: 'id' })
  clientApplication?: ClientApplication;
}

export default ClientApplicationUser;
