import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('permissions_roles')
class PermissionClientApplicationRole extends MainEntity {
  @Column()
  client_application_permission_id: number;

  @Column()
  client_application_role_id: number;
}

export default PermissionClientApplicationRole;
