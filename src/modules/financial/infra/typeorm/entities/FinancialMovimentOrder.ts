import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import Order from '@modules/commercial/infra/typeorm/entities/Order';
import FinancialMoviment from './FinancialMoviment';

@Entity('financial_moviments_orders')
class FinancialMovimentOrder extends MainEntity {
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
