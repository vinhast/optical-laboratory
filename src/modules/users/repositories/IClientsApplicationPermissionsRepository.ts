import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';
import IFindPermissonByRouteDTO from '@modules/users/dtos/IFindPermissonByRouteDTO';
import ClientApplicationPermission from '../infra/typeorm/entities/ClientApplicationPermission';

export default interface IClientsApplicationPermissionsRepository {
  findAllClientsApplicationPermissions(): Promise<
    ClientApplicationPermission[]
  >;
  findById(id: number): Promise<ClientApplicationPermission | undefined>;
  findByIds(id: number[]): Promise<ClientApplicationPermission[]>;
  findByName(name: string): Promise<ClientApplicationPermission | undefined>;
  findByRoute(
    data: IFindPermissonByRouteDTO,
  ): Promise<ClientApplicationPermission | undefined>;
  create(data: ICreatePermissionDTO): Promise<ClientApplicationPermission>;
  save(
    permission: ClientApplicationPermission,
  ): Promise<ClientApplicationPermission>;
  delete(id: number): Promise<void>;
}
