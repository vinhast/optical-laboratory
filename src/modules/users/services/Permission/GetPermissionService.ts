import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import Permission from '@modules/users/infra/typeorm/entities/Permission';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';

@injectable()
class GetpermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Permission> {
    const cacheKey = `permission-get-${id}`;
    let permission = await this.cacheProvider.recover<Permission | undefined>(
      cacheKey,
    );

    if (!permission) {
      permission = await this.permissionsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(permission));
    }

    if (!permission) {
      throw new AppError('Permission not found.', 404);
    }

    return permission;
  }
}

export default GetpermissionService;
