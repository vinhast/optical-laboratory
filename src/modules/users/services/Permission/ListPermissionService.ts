import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import Permission from '@modules/users/infra/typeorm/entities/Permission';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';

@injectable()
class ListPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private PermissionsRepository: IPermissionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Permission[]> {
    const cacheKey = `permission-list`;
    let permission = await this.cacheProvider.recover<Permission[]>(cacheKey);

    if (!permission) {
      await this.cacheProvider.save(cacheKey, classToClass(permission));
      permission = await this.PermissionsRepository.findAllPermissions();
    }

    if (!permission) {
      throw new AppError('Permission not found.', 404);
    }

    return permission;
  }
}

export default ListPermissionService;
