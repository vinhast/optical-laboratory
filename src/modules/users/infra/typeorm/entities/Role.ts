import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import Permission from './Permission';

@Entity('roles')
class Role extends MainEntity {
  @Column()
  name: string;

  @Column()
  description?: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions?: Permission[];
}

export default Role;
