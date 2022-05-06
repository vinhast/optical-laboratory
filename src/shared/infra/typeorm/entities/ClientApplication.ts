import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('clients_application')
class ClientApplication {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email?: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

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

  @Column()
  mobile?: string;

  @Column()
  active?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default ClientApplication;
