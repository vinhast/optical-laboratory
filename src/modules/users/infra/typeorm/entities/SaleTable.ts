import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('sales_tables')
class SaleTable extends MainEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  active: boolean;
}

export default SaleTable;
