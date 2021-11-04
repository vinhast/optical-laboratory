import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('invoice_settings')
class InvoiceSetting {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  company_name: string;

  @Column()
  cnpj: string;

  @Column()
  city_registration: string;

  @Column()
  state_registration?: string;

  @Column()
  address: string;

  @Column()
  nfse_env?: boolean;

  @Column()
  nfse_rps_number?: number;

  @Column()
  certified_file?: string;

  @Column()
  certified_validate?: Date;

  @Column()
  certified_password: string;

  @Column()
  nf_emission_due?: number;

  @Column()
  dir?: number;

  @Column()
  invoice_email_copy?: string;

  @Column()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default InvoiceSetting;
