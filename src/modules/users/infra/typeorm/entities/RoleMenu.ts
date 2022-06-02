import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import Menu from '@modules/users/infra/typeorm/entities/Menu';

@Entity('roles_menus')
class RoleMenu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  role_id: number;

  @Column()
  menu_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: Menu;
}

export default RoleMenu;
