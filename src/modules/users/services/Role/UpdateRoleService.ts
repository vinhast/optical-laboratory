import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import Permission from '@modules/users/infra/typeorm/entities/Permission';

interface IRequest {
  id: number;
  name: string;
  description: string;
  permissions?: Permission[];
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    description,
    permissions,
  }: IRequest): Promise<Role> {
    const cacheKey = `role-get-${id}`;
    let role = await this.cacheProvider.recover<Role | undefined>(cacheKey);

    if (!role) {
      role = await this.rolesRepository.findById(id);
    }

    if (!role) {
      throw new AppError('role not found.', 404);
    }

    role.description = description;
    role.name = name;
    role.permissions = permissions;

    await this.cacheProvider.invalidate(`role-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.rolesRepository.save(role);

    return role;
  }
}

export default UpdateRoleService;
