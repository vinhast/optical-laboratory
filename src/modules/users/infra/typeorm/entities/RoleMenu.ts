import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import Menu from '@modules/users/infra/typeorm/entities/Menu';
import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';

@Entity('roles_menus')
class RoleMenu extends MainEntity {
  @Column()
  role_id: number;

  @Column()
  menu_id: number;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}

export default RoleMenu;
