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

import OrderProduct from '@modules/comercial/infra/typeorm/entities/OrderProduct';
import ProductCateory from './ProductCategory';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_category_id: number;

  @Column()
  side: string;

  @Column()
  cylindrical: string;

  @Column()
  spherical: string;

  @Column()
  price?: string;

  @Column()
  bars_code?: string;

  @Column()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ProductCateory)
  @JoinColumn({ name: 'product_category_id' })
  group: ProductCateory;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orders_products: OrderProduct[];
}

export default Product;
