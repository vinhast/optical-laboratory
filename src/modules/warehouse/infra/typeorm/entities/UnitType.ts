import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, OneToMany } from 'typeorm';
import ProductCategory from './ProductCategory';

@Entity('unit_types')
class UnitType extends MainEntity {
  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany(() => ProductCategory, categorie => categorie.unitType)
  categories: ProductCategory[];
}

export default UnitType;
