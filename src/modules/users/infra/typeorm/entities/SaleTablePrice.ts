import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sales_tables_prices')
class SaleTablePrice {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SaleTablePrice;
