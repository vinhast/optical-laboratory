import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  description: string;
  permissions?: number[];
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
    permissions,
  }: IRequest): Promise<Role> {
    let role = await this.rolesRepository.findByName(name);
    if (role) {
      throw new AppError('Role already exists.');
    }

    let existsPermissions;
    if (permissions) {
      existsPermissions = await this.permissionsRepository.findByIds(
        permissions,
      );
    }

    role = await this.rolesRepository.create({
      name,
      description,
      permissions: existsPermissions,
    });

    await this.cacheProvider.invalidate('roles-list');

    return role;
  }
}

export default CreateRoleService;
