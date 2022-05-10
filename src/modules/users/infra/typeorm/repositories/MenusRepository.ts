import { getRepository, Repository } from 'typeorm';

import IFinancialCategoriesRepository from '@modules/users/repositories/IMenusRepository';
import ICreateMenuDTO from '@modules/users/dtos/ICreateMenuDTO';

import Menu from '@modules/users/infra/typeorm/entities/Menu';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class MenusRepository
  extends MainRepository
  implements IFinancialCategoriesRepository
{
  private ormRepository: Repository<Menu>;

  constructor() {
    const repository = getRepository(Menu);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(menuData: ICreateMenuDTO): Promise<Menu> {
    const menu = this.ormRepository.create(menuData);

    await this.ormRepository.save(menu);

    return menu;
  }

  public save(menu: Menu): Promise<Menu> {
    return this.ormRepository.save(menu);
  }
}

export default MenusRepository;
