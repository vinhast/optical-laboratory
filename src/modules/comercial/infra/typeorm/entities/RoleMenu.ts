import Menu from '@modules/users/infra/typeorm/entities/Menu';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles_menus')
class RoleMenu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  role_id: number;

  @Column()
  menu_id: number;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}

export default RoleMenu;
