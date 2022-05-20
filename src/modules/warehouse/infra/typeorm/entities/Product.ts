import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import OrderProduct from '@modules/commercial/infra/typeorm/entities/OrderProduct';
import ProductCateory from './ProductCategory';

@Entity('products')
class Product extends MainEntity {
  @Column()
  product_category_id: number;

  @Column()
  side?: string;

  @Column()
  cylindrical?: string;

  @Column()
  spherical?: string;

  @Column()
  addition?: string;

  @Column()
  price?: string;

  @Column()
  bars_code?: string;

  @Column()
  active: string;

  @ManyToOne(() => ProductCateory)
  @JoinColumn({ name: 'product_category_id' })
  group: ProductCateory;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orders_products: OrderProduct[];
}

export default Product;
