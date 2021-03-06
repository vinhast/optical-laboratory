import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('fiscal_settings')
class FiscalSetting extends MainEntity {
  @Column()
  company_name: string;

  @Column()
  cnpj: string;

  @Column()
  city_registration: string;

  @Column()
  state_registration?: string;

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

  @Column()
  street?: string;

  @Column()
  number?: string;

  @Column()
  complement?: string;

  @Column()
  district?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  zip_code?: string;

  @Column()
  phone?: string;
}

export default FiscalSetting;
