import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity('providers')
class Provider extends MainEntity {
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
  active: boolean;
}

export default Provider;
