import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('sales_tables_prices_services')
class SaleTablePriceService extends MainEntity {
  @Column()
  service_id: number;

  @Column()
  table_id: number;

  @Column()
  price: string;

  @Column()
  user_id?: number;
}

export default SaleTablePriceService;
