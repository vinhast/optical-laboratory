import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('financial_moviments_types')
class FinancialMovimentType extends MainEntity {
  @Column()
  product_id: number;

  @Column()
  financial_moviment_type_group_id: number;

  @Column()
  name: string;
}

export default FinancialMovimentType;
