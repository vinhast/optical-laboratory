import Permission from '@modules/users/infra/typeorm/entities/Permission';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';
import IFindPermissonByRouteDTO from '@modules/users/dtos/IFindPermissonByRouteDTO';

export default interface IPermissionsRepository {
  findAllPermissions(): Promise<Permission[]>;
  findById(id: number): Promise<Permission | undefined>;
  findByIds(id: number[]): Promise<Permission[]>;
  findByName(name: string): Promise<Permission | undefined>;
  findByRoute(data: IFindPermissonByRouteDTO): Promise<Permission | undefined>;
  create(data: ICreatePermissionDTO): Promise<Permission>;
  save(permission: Permission): Promise<Permission>;
  delete(id: number): Promise<void>;
}
