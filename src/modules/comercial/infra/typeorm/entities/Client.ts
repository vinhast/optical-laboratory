import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  table_id: number;

  @Column()
  company_name: string;

  @Column()
  company_social_name?: string;

  @Column()
  cnpj: string;

  @Column()
  state_registration?: string;

  @Column()
  city_registration?: string;

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
  ibge?: number;

  @Column()
  phone_1?: string;

  @Column()
  phone_2?: string;

  @Column()
  mobile?: string;

  @Column()
  email?: string;

  @Column()
  note?: string;

  @Column()
  shipment_method?: string;

  @Column()
  payment_method?: string;

  @Column()
  payment_day?: string;

  @Column()
  active?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Client;
