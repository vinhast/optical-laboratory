import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('permissions_roles')
class PermissionRole extends MainEntity {
  @Column()
  permission_id: number;

  @Column()
  role_id: number;
}

export default PermissionRole;
