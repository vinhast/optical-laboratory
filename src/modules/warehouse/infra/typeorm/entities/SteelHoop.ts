import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipment_files')
class SteelHoop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  hoop_id: number;

  @Column()
  steel_id: number;

  @Column()
  _create: number;

  @Column()
  _read: number;

  @Column()
  _update: number;

  @Column()
  _delete: number;
}

export default SteelHoop;
