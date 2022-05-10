import { getRepository, Repository } from 'typeorm';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';
import IFindPermissonByRouteDTO from '@modules/users/dtos/IFindPermissonByRouteDTO';

import Permission from '@modules/users/infra/typeorm/entities/Permission';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class PermissionsRepository
  extends MainRepository
  implements IPermissionsRepository
{
  private ormRepository: Repository<Permission>;

  constructor() {
    const repository = getRepository(Permission);
    super(repository);
    this.ormRepository = repository;
  }

  public async findByRoute({
    method,
    baseUrl,
    path,
  }: IFindPermissonByRouteDTO): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne({
      where: {
        method,
        base_url: baseUrl,
        path: path || null,
      },
    });
    return permission;
  }

  public async findByIds(ids: number[]): Promise<Permission[]> {
    const permissions = await this.ormRepository.findByIds(ids);
    return permissions;
  }

  public async findAllPermissions(): Promise<Permission[]> {
    const permissions = await this.ormRepository.find();
    return permissions;
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = this.ormRepository.create(permissionData);

    await this.ormRepository.save(permission);

    return permission;
  }

  public save(permission: Permission): Promise<Permission> {
    return this.ormRepository.save(permission);
  }
}

export default PermissionsRepository;
