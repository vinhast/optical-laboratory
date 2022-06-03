import { getRepository, Repository } from 'typeorm';

import IFinancialCategoriesRepository from '@modules/users/repositories/IMenusRepository';
import ICreateMenuDTO from '@modules/users/dtos/ICreateMenuDTO';

import Menu from '@modules/users/infra/typeorm/entities/Menu';

class MenusRepository implements IFinancialCategoriesRepository {
  private ormRepository: Repository<Menu>;

  constructor() {
    const repository = getRepository(Menu);
    this.ormRepository = repository;
  }

  public async findAll(): Promise<Menu[]> {
    const menus = await this.ormRepository.find();
    return menus;
  }

  public async findById(id: number): Promise<Menu | undefined> {
    const menu = await this.ormRepository.findOne(id);
    return menu;
  }

  public async findByParentId(parent_id: number): Promise<Menu[]> {
    const menus = await this.ormRepository.find({
      where: { parent_id },
    });
    return menus;
  }

  public async findByName(name: string): Promise<Menu | undefined> {
    const menu = await this.ormRepository.findOne({ name });
    return menu;
  }

  public async create(menuData: ICreateMenuDTO): Promise<Menu> {
    const menu = this.ormRepository.create(menuData);

    await this.ormRepository.save(menu);

    return menu;
  }

  public save(menu: Menu): Promise<Menu> {
    return this.ormRepository.save(menu);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default MenusRepository;
