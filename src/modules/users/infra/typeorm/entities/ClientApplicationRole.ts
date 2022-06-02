import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import ClientApplicationPermission from './ClientApplicationPermission';

@Entity('clients_application_roles')
class ClientApplicationRole extends MainEntity {
  @Column()
  name: string;

  @Column()
  description?: string;

  @ManyToMany(() => ClientApplicationPermission)
  @JoinTable({
    name: 'permissions_clients_application_roles',
    joinColumns: [
      { name: 'client_application_role_id', referencedColumnName: 'id' },
    ],
    inverseJoinColumns: [{ name: 'client_application_permission_id' }],
  })
  clientApplicationPermissions?: ClientApplicationPermission[];
}

export default ClientApplicationRole;
