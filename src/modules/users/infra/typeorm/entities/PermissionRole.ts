import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions_roles')
class PermissionRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  permission_id: number;

  @Column()
  role_id: number;
}

export default PermissionRole;
