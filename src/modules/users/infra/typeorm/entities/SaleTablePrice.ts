import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import SaleTable from './SaleTable';

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

  @ManyToOne(() => ProductCategory, pc => pc.tablesPrices)
  @JoinColumn({ name: 'product_category_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  productCategories: ProductCategory;

  @ManyToOne(() => SaleTable)
  @JoinColumn({ name: 'table_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  table: SaleTable;
}

export default SaleTablePrice;
