import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

import Role from '@modules/users/infra/typeorm/entities/Role';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class RolesRepository extends MainRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    const repository = getRepository(Role);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(roleData);

    await this.ormRepository.save(role);

    return role;
  }

  public save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }
}

export default RolesRepository;
