import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import Menu from '@modules/users/infra/typeorm/entities/Menu';
import IMenusRepository from '@modules/users/repositories/IMenusRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Menu> {
    const cacheKey = `menu-get-${id}`;
    let menu = await this.cacheProvider.recover<Menu | undefined>(
      cacheKey,
      true,
    );

    if (!menu) {
      menu = await this.menusRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(menu), true);
    }

    if (!menu) {
      throw new AppError('menu not found.', 404);
    }

    return menu;
  }
}

export default GetService;
