import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tables')
class Table {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  active: boolean;
}

export default Table;
