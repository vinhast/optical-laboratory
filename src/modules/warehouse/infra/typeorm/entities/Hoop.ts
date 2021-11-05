import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hoops')
class Hoop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  parent_id?: number;

  @Column()
  model?: string;

  @Column()
  foreign_key?: number;

  @Column()
  alias?: string;

  @Column()
  lft?: number;

  @Column()
  rght?: number;
}

export default Hoop;
