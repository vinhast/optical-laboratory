import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import Order from '@modules/commercial/infra/typeorm/entities/Order';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import Product from './Product';

@Entity('stocks_moviments')
class StockMoviment extends MainEntity {
  @Column()
  product_id: number;

  @Column()
  order_id?: number;

  @Column()
  financial_moviment_id?: number;

  @Column()
  user_id: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  origin: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => FinancialMoviment)
  @JoinColumn({ name: 'financial_moviment_id' })
  financialMoviment: FinancialMoviment;
}

export default StockMoviment;
