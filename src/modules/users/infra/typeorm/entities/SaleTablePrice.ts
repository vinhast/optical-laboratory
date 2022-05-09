import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('sales_tables_prices')
class SaleTablePrice extends MainEntity {
  @Column()
  product_category_id: number;

  @Column()
  table_id: number;

  @Column()
  unit_price: string;

  @Column()
  wholesale_price: string;

  @Column()
  user_id: number;
}

export default SaleTablePrice;
