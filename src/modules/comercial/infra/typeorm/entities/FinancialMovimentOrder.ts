import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import FinancialMoviment from './FinancialMoviment';
import Order from './Orders';

@Entity('financial_moviments_orders')
class FinancialMovimentOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  financial_moviment_id: number;

  @Column()
  order_id: number;

  @ManyToOne(() => FinancialMoviment)
  @JoinColumn({ name: 'financial_moviment_id' })
  financialMoviment: FinancialMoviment;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}

export default FinancialMovimentOrder;
