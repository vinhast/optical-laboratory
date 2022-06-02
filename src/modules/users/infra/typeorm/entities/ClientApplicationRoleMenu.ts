import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import Menu from '@modules/users/infra/typeorm/entities/Menu';
import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';

@Entity('roles_menus')
class ClientApplicationRoleMenu extends MainEntity {
  @Column()
  client_application_role_id: number;

  @Column()
  menu_id: number;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: Menu;
}

export default ClientApplicationRoleMenu;
