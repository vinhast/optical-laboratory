import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Menu from '@modules/users/infra/typeorm/entities/Menu';
import IMenusRepository from '@modules/users/repositories/IMenusRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Menu[]> {
    const cacheKey = `menu-list`;
    let menus = await this.cacheProvider.recover<Menu[]>(cacheKey);

    if (!menus) {
      menus = await this.menusRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(menus));
    }

    return menus;
  }
}

export default ListService;
