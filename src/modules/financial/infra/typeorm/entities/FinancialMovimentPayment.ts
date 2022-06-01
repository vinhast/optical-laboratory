import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import FinancialMoviment from './FinancialMoviment';

import PaymentGateway from './PaymentGateway';

@Entity('financial_moviments_payments')
class FinancialMovimentPayment extends MainEntity {
  @Column()
  financial_moviment_id: number;

  @Column()
  payment_method: string;

  @Column()
  payment_gateway_id?: number;

  @Column()
  document_number: string;

  @Column()
  digitable_line: string;

  @Column()
  bar_code: string;

  @Column({ type: 'enum', enum: ['Awaiting payment', 'Paid', 'Cancelled'] })
  situation: 'Awaiting payment' | 'Paid' | 'Cancelled';

  @Column()
  nsu_date?: Date;

  @Column()
  payment_date?: Date;

  @Column()
  due_date: Date;

  @ManyToOne(() => PaymentGateway)
  @JoinColumn({ name: 'payment_gateway_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  paymentGateway?: PaymentGateway;

  @ManyToOne(
    () => FinancialMoviment,
    financialMoviment => financialMoviment.financialMovimentsPayments,
  )
  @JoinColumn({ name: 'financial_moviment_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  financialMoviment?: FinancialMoviment;
}

export default FinancialMovimentPayment;
