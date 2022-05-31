import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import ClientApplication from './ClientApplication';

export class MainEntity {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  client_application_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => ClientApplication)
  @JoinColumn({ name: 'client_application_id', referencedColumnName: 'id' })
  clientApplication: ClientApplication;
}
