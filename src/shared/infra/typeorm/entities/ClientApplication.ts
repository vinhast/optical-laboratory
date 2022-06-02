import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

@Entity('clients_application')
class ClientApplication {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar?: string;

  @Column()
  cnpj: string;

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
  active?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Expose({ name: 'avatar_url' })
  getavatar_url?(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.s3.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default ClientApplication;
