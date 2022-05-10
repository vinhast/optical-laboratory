import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import Role from '@modules/users/infra/typeorm/entities/Role';

@injectable()
class ListRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Role[]> {
    const cacheKey = `role-list`;
    let roles = await this.cacheProvider.recover<Role[]>(cacheKey);

    if (!roles) {
      roles = await this.rolesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(roles));
    }

    return roles;
  }
}

export default ListRoleService;
