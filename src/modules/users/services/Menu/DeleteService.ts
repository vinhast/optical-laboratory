import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMenusRepository from '@modules/users/repositories/IMenusRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const menu = await this.menusRepository.findById(id);

    if (!menu) {
      throw new AppError('menu not found.', 404);
    }

    await this.cacheProvider.invalidate(`menus-list`, true);

    await this.menusRepository.delete(id);

    return true;
  }
}

export default DeleteService;
