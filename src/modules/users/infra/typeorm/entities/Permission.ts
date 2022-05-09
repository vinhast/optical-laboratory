import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('permissions')
class Permission extends MainEntity {
  @Column()
  name: string;

  @Column()
  method: string;

  @Column()
  base_url: string;

  @Column()
  path: string;

  @Column()
  description: string;
}

export default Permission;
