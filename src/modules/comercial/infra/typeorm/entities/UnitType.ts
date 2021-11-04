import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unit_types')
class UnitType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;
}

export default UnitType;
