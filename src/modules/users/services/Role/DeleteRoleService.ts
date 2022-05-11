import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError('role not found.', 404);
    }

    await this.cacheProvider.invalidate(`roles-list`);

    await this.rolesRepository.delete(id);

    return true;
  }
}

export default DeleteRoleService;
