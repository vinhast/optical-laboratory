import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  company_social_name: string;

  @Column()
  company_name: string;

  @Column()
  cnpj?: string;

  @Column()
  phone: string;

  @Column()
  mobile?: string;

  @Column()
  email?: string;

  @Column()
  street?: string;

  @Column()
  number?: string;

  @Column()
  complement?: string;

  @Column()
  district?: string;

  @Column()
  zip_code?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  ibge?: number;

  @Column()
  note?: string;

  @Column()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Provider;
