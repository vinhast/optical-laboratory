import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions_users')
class PermissionUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  permission_id: number;

  @Column()
  user_id: number;
}

export default PermissionUser;
