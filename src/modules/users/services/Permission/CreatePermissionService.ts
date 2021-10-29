import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Permission from '@modules/users/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  description: string;
  method: string;
  base_url: string;
  path?: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
    method,
    base_url,
    path,
  }: IRequest): Promise<Permission> {
    const checkPermissionExists = await this.permissionsRepository.findByName(
      name,
    );
    if (checkPermissionExists) {
      throw new AppError('Permission already exists.');
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
      method,
      base_url,
      path,
    });

    await this.cacheProvider.invalidatePrefix('permissions-list');

    return permission;
  }
}

export default CreatePermissionService;
