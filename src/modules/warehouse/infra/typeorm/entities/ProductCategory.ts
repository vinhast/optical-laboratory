import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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
  type?: string;

  @Column()
  ncm?: number;

  @Column()
  cst?: number;

  @Column()
  cfop?: number;

  @Column()
  unit_type_id?: number;

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

  @ManyToOne(
    () => ProductCategory,
    productCategory => productCategory.childProductCateories,
  )
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parentProductCategory: ProductCategory;

  @OneToMany(
    () => ProductCategory,
    productCategory => productCategory.parentProductCategory,
  )
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  childProductCateories: ProductCategory[];
}

export default ProductCategory;
