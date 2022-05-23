import { Entity, Column } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';

@Entity('services')
class Service extends MainEntity {
  @Column()
  price?: string;

  @Column()
  active: string;
}

export default Service;
