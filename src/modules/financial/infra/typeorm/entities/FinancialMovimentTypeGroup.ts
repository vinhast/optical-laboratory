import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('financial_moviments_types_groups')
class FinancialMovimentTypeGroup extends MainEntity {
  @Column()
  operation_type: string;

  @Column()
  active: number;

  @Column()
  name: string;
}

export default FinancialMovimentTypeGroup;
