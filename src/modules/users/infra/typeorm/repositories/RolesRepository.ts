import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

import Role from '@modules/users/infra/typeorm/entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findById(id: number): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne(id, {
      relations: ['permissions'],
    });
    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ name });
    return role;
  }

  public async findAllRoles(): Promise<Role[]> {
    const roles = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
    return roles;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(roleData);

    await this.ormRepository.save(role);

    return role;
  }

  public save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default RolesRepository;
