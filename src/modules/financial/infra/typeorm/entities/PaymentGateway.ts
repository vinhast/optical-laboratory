import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import PaymentModule from './PaymentModule';

@Entity('payment_gateways')
class PaymentGateway extends MainEntity {
  @Column({ type: 'enum', enum: ['Boleto'] })
  type: 'Boleto';

  @Column()
  payment_module_id: number;

  @Column({ type: 'json' })
  credentials: any;

  @ManyToOne(() => PaymentModule)
  @JoinColumn({ name: 'payment_module_id', referencedColumnName: 'id' })
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  paymentModule: PaymentModule;
}

export default PaymentGateway;
