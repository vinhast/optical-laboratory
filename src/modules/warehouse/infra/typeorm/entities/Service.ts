import { Entity, Column } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';

@Entity('services')
class Service extends MainEntity {
  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  price?: string;
}

export default Service;
