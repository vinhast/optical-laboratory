import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

interface IRequest {
  id: number;
  name: string;
  method: string;
  base_url: string;
  path: string;
  description: string;
}

@injectable()
class UpdatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    base_url,
    description,
    id,
    method,
    name,
    path,
  }: IRequest): Promise<Permission> {
    const cacheKey = `permission-get-${id}`;
    let permission = await this.cacheProvider.recover<Permission | undefined>(
      cacheKey,
    );

    if (!permission) {
      permission = await this.permissionsRepository.findById(id);
    }

    if (!permission) {
      throw new AppError('Permission not found.', 404);
    }

    permission.base_url = base_url;
    permission.name = name;
    permission.path = path;
    permission.method = method;
    permission.description = description;

    await this.cacheProvider.invalidate(`permission-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.permissionsRepository.save(permission);

    return permission;
  }
}

export default UpdatePermissionService;
