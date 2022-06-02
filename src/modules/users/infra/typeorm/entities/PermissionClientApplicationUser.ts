import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('permissions_clients_application_users')
class PermissionClientApplicationUser extends MainEntity {
  @Column()
  permission_id: number;

  @Column()
  client_application_user_id: number;
}

export default PermissionClientApplicationUser;
