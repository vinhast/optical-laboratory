import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import Client from '@modules/commercial/infra/typeorm/entities/Client';
import Provider from '@modules/commercial/infra/typeorm/entities/Provider';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';
import FinancialCategory from './FinancialCategory';
import PaymentGateway from './PaymentGateway';
import FinancialMovimentPayment from './FinancialMovimentPayment';

@Entity('financial_moviments')
class FinancialMoviment extends MainEntity {
  @Column()
  client_id?: number;

  @Column()
  provider_id?: number;

  @Column()
  category_id: number;

  @Column()
  sub_category_id: number;

  @Column()
  bank_account_id?: number;

  @Column()
  shipment_file_id?: number;

  @Column()
  description: string;

  @Column()
  due_date?: Date;

  @Column()
  value: string;

  @Column()
  products_value?: string;

  @Column()
  services_value?: string;

  @Column()
  credits_value?: string;

  @Column()
  fees_fines_value?: string;

  @Column()
  nf_code?: string;

  @Column()
  nf_receipt?: string;

  @Column()
  nf_receipt_date?: Date;

  @Column()
  nf_issue_date?: Date;

  @Column()
  nf_cStat_receipt?: string;

  @Column()
  nf_xmotivo_receipt?: string;

  @Column()
  nf_number?: number;

  @Column()
  nf_key?: string;

  @Column()
  nf_protocoll?: string;

  @Column()
  nf_protocoll_date?: string;

  @Column()
  nf_protocoll_menssage?: string;

  @Column()
  nf_year_month?: string;

  @Column()
  nf_lot?: string;

  @Column()
  nf_canceled?: string;

  @Column()
  nf_canceled_protocoll?: string;

  @Column()
  nf_canceled_date?: string;

  @Column()
  nf_canceled_reason?: string;

  @Column()
  nf_status: string;

  @Column()
  nfse_number?: string;

  @Column()
  nfse_verification_code?: string;

  @Column()
  nfse_issue_date?: Date;

  @Column()
  nfse_rps_number?: number;

  @Column()
  nfse_canceled?: string;

  @Column()
  nfse_status: string;

  @Column()
  finished: string;

  @Column()
  payment_method: string;

  @Column()
  invoice_status?: string;

  @Column()
  invoice_registered?: string;

  @Column()
  invoice_bank_downloaded?: string;

  @Column()
  operation_type: string;

  @Column()
  generated_user_id?: number;

  @Column()
  downloaded_user_id?: number;

  @Column()
  downloaded_at?: Date;

  @Column()
  payment_method_text: string;

  @Column()
  payment_gateway_id?: number;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Provider;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client?: Client;

  @ManyToOne(() => ClientApplication)
  @JoinColumn({ name: 'downloaded_user_id', referencedColumnName: 'id' })
  downloadedUser?: ClientApplication;

  @ManyToOne(() => ClientApplication)
  @JoinColumn({ name: 'generated_user_id', referencedColumnName: 'id' })
  generatedUser?: ClientApplication;

  @ManyToOne(() => FinancialCategory)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  financialCategory?: FinancialCategory;

  @ManyToOne(() => FinancialCategory)
  @JoinColumn({ name: 'sub_category_id', referencedColumnName: 'id' })
  financialSubCategory?: FinancialCategory;

  @ManyToOne(() => PaymentGateway)
  @JoinColumn({ name: 'payment_gateway_id', referencedColumnName: 'id' })
  paymentGateway?: PaymentGateway;

  @OneToMany(
    () => FinancialMovimentPayment,
    financialMovimentPayment => financialMovimentPayment.financialMoviment,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'financial_moviment_id' })
  financialMovimentsPayments?: FinancialMovimentPayment[];

  @ManyToOne(() => ClientApplicationUser)
  @JoinColumn({
    name: 'client_application_id',
    referencedColumnName: 'client_application_id',
  })
  clientApplicationUser: ClientApplicationUser;
}

export default FinancialMoviment;
