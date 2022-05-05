import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('financial_moviments_types_groups')
class FinancialMovimentTypeGroup {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  operation_type: string;

  @Column()
  active: number;

  @Column()
  name: string;
}

export default FinancialMovimentTypeGroup;
