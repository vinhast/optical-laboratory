import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import ClientApplication from './ClientApplication';

export class MainEntity {
  @Column()
  id: number;

  @PrimaryColumn()
  id_key: number;

  @PrimaryColumn()
  client_application_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => ClientApplication)
  @JoinColumn({ name: 'client_application_id' })
  clientApplication: ClientApplication;
}
