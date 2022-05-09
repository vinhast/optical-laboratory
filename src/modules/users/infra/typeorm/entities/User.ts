import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import Permission from './Permission';
import Role from './Role';

@Entity('users')
class User extends MainEntity {
  @Column()
  role_id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  user: User;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_users',
    joinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  user_permissions: Permission[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id', referencedColumnName: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  role_permissions: Permission[];

  @Expose({ name: 'avatar_url' })
  getavatar_url(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.s3.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
