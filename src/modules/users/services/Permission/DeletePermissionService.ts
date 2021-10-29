import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeletePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) {
      throw new AppError('Permission not found.', 404);
    }

    await this.cacheProvider.invalidate(`permissions-list`);

    await this.permissionsRepository.delete(id);

    return true;
  }
}

export default DeletePermissionService;
