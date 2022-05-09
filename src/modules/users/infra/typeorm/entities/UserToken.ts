import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, Generated } from 'typeorm';

@Entity('user_tokens')
class UserToken extends MainEntity {
  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: number;
}

export default UserToken;
