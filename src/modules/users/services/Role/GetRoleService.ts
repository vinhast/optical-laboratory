import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetRoleService {
  constructor(
    @inject('RolesRepository')
    private roleRepository: IRolesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Role> {
    const cacheKey = `role-get-${id}`;
    let role = await this.cacheProvider.recover<Role | undefined>(cacheKey);

    if (!role) {
      role = await this.roleRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(role));
    }

    if (!role) {
      throw new AppError('role not found.', 404);
    }

    return role;
  }
}

export default GetRoleService;
