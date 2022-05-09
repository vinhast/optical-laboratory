import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('menus')
class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Menu, menu => menu.childMenus)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parentMenu: Menu;

  @OneToMany(() => Menu, menu => menu.parentMenu)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  childMenus: Menu[];
}

export default Menu;
