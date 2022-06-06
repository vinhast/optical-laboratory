import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Menu from '@modules/users/infra/typeorm/entities/Menu';
import IMenusRepository from '@modules/users/repositories/IMenusRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  parent_id: number | undefined;
  method?: string;
  name: string;
  icon?: string;
  controller?: string;
  action?: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    parent_id,
    method,
    name,
    icon,
    controller,
    action,
  }: IRequest): Promise<Menu> {
    let menu = await this.menusRepository.findByName(name);
    if (menu) {
      throw new AppError('Menu already exists.');
    }

    menu = await this.menusRepository.create({
      parent_id,
      method,
      name,
      icon,
      controller,
      action,
    });

    await this.cacheProvider.invalidate('menus-list', true);

    return menu;
  }
}

export default CreateService;
