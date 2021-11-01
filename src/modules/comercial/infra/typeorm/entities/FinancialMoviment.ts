import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import FinancialMovimentType from './FinancialMovimentType';
import Provider from './Provider';
import Client from './Client';

@Entity('financial_moviments')
class FinancialMoviment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  client_id?: number;

  @Column()
  provider_id?: number;

  @Column()
  financial_moviment_type_id: number;

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
  payment_method?: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => FinancialMovimentType)
  @JoinColumn({ name: 'financial_moviment_type_id' })
  financialMovimentType: FinancialMovimentType;
}

export default FinancialMoviment;
