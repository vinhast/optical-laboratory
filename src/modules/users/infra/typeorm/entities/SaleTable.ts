import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales_tables')
class SaleTable {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  active: boolean;
}

export default SaleTable;
