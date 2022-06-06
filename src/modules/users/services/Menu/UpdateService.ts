import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Menu from '@modules/users/infra/typeorm/entities/Menu';
import IMenusRepository from '@modules/users/repositories/IMenusRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
  parent_id: number | undefined;
  method?: string;
  name: string;
  controller?: string;
  action?: string;
  url?: string;
  icon?: string;
}

@injectable()
class UpdateService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    parent_id,
    method,
    name,
    controller,
    action,
    icon,
  }: IRequest): Promise<Menu> {
    const cacheKey = `menu-get-${id}`;
    let menu = await this.cacheProvider.recover<Menu | undefined>(
      cacheKey,
      true,
    );

    if (!menu) {
      menu = await this.menusRepository.findById(id);
    }

    if (!menu) {
      throw new AppError('menu not found.', 404);
    }

    menu.parent_id = parent_id;
    menu.method = method;
    menu.name = name;
    menu.controller = controller;
    menu.action = action;
    menu.icon = icon;

    await this.cacheProvider.invalidate(`menus-list`, true);

    await this.cacheProvider.invalidate(cacheKey, true);

    await this.menusRepository.save(menu);

    return menu;
  }
}

export default UpdateService;
