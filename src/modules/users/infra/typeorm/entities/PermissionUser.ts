import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('permissions_users')
class PermissionUser extends MainEntity {
  @Column()
  permission_id: number;

  @Column()
  user_id: number;
}

export default PermissionUser;
