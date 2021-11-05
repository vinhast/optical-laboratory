import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('product_categories')
class ProductCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
