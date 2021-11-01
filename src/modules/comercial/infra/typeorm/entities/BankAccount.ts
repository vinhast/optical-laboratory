import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bank_accounts')
class BankAccount {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  registry?: string;

  @Column()
  agency?: string;

  @Column()
  account?: string;

  @Column()
  account_dv?: number;

  @Column()
  client_code?: number;

  @Column()
  assignor_code?: number;

  @Column()
  assignor_code_dv?: number;

  @Column()
  document?: string;

  @Column()
  transmission_code?: string;

  @Column()
  currency?: string;

  @Column()
  invoice_value?: number;

  @Column()
  delay_fines?: number;

  @Column()
  delay_taxes?: number;

  @Column()
  message_1?: string;

  @Column()
  message_2?: string;

  @Column()
  message_3?: string;

  @Column()
  instruction_1?: string;

  @Column()
  instruction_2?: string;

  @Column()
  instruction_3?: string;

  @Column()
  user_id?: number;

  @Column()
  username?: string;

  @Column()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BankAccount;
