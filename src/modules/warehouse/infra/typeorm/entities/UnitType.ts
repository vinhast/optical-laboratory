import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('unit_types')
class UnitType extends MainEntity {
  @Column()
  name: string;

  @Column()
  abbreviation: string;
}

export default UnitType;
