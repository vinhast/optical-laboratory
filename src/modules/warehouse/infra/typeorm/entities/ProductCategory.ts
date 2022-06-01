import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import UnitType from './UnitType';

@Entity('product_categories')
class ProductCategory extends MainEntity {
  @Column()
  parent_id?: number;

  @Column()
  user_id?: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  ncm?: number;

  @Column()
  cst?: number;

  @Column()
  cfop?: number;

  @Column()
  cfop_out_of_state?: number;

  @Column()
  unit_type_id?: number;

  @Column()
  lense_type?: string;

  @Column()
  lense_side?: string;

  @Column()
  price?: string;

  @Column()
  spherical_start?: number;

  @Column()
  spherical_end?: number;

  @Column()
  cylindrical_start?: number;

  @Column()
  cylindrical_end?: number;

  @Column()
  addition_start?: number;

  @Column()
  addition_end?: number;

  @Column()
  online?: string;

  @Column()
  dir?: number;

  @Column()
  cover?: string;

  @ManyToOne(
    () => ProductCategory,
    productCategory => productCategory.childProductCateories,
  )
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  parentProductCategory: ProductCategory;

  @OneToMany(
    () => ProductCategory,
    productCategory => productCategory.parentProductCategory,
  )
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  childProductCateories: ProductCategory[];

  @ManyToOne(() => UnitType, type => type.categories)
  @JoinColumn({ name: 'unit_type_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  unitType: UnitType;

  @OneToMany(() => SaleTablePrice, table => table.productCategories)
  tablesPrices: SaleTablePrice[];
}

export default ProductCategory;
