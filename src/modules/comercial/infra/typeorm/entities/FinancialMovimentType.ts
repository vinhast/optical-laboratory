import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('financial_moviments_types')
class FinancialMovimentType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_id: number;

  @Column()
  financial_moviment_type_group_id: number;

  @Column()
  name: string;
}

export default FinancialMovimentType;
