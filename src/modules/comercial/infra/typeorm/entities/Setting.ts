import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
class Setting {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  setting: string;

  @Column()
  value: string;
}

export default Setting;
