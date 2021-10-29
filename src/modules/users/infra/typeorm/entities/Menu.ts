import { MainEntity } from '@shared/infra/typeorm/entities/MainEntity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('menus')
class Menu extends MainEntity {
  @Column()
  parent_id?: number;

  @Column()
  method?: string;

  @Column()
  name: string;

  @Column()
  controller?: string;

  @Column()
  action?: string;

  @Column()
  type: string;

  @ManyToOne(() => Menu, menu => menu.childMenus)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parentMenu: Menu;

  @OneToMany(() => Menu, menu => menu.parentMenu)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  childMenus: Menu[];
}

export default Menu;
