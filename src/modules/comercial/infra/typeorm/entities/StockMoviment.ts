import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import FinancialMoviment from './FinancialMoviment';
import Order from './Orders';
import Product from './Product';

@Entity('stocks_moviments')
class StockMoviment {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

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
