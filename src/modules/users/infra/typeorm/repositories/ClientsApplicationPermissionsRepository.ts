import { getRepository, Repository } from 'typeorm';

import IClientsApplicationPermissionsRepository from '@modules/users/repositories/IClientsApplicationPermissionsRepository';
import ICreateClientsApplicationPermissionDTO from '@modules/users/dtos/ICreateClientApplicationPermissionDTO';
import IFindPermissonByRouteDTO from '@modules/users/dtos/IFindPermissonByRouteDTO';

import ClientsApplicationPermission from '@modules/users/infra/typeorm/entities/ClientApplicationPermission';
import httpContext from 'express-http-context';

class ClientsApplicationPermissionsRepository
  implements IClientsApplicationPermissionsRepository
{
  private ormRepository: Repository<ClientsApplicationPermission>;
  private user: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(ClientsApplicationPermission);
    this.ormRepository = repository;
    this.user = httpContext.get('user');
  }

  public async findById(
    id: number,
  ): Promise<ClientsApplicationPermission | undefined> {
    const clientApplicationPermission = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id: this.user.client_application_id,
      },
    });
    return clientApplicationPermission;
  }

  public async findByName(
    name: string,
  ): Promise<ClientsApplicationPermission | undefined> {
    const clientApplicationPermission = await this.ormRepository.findOne({
      where: {
        name,
        client_application_id: this.user.client_application_id,
      },
    });
    return clientApplicationPermission;
  }

  public async findByRoute({
    method,
    baseUrl,
    path,
    client_application_id,
  }: IFindPermissonByRouteDTO): Promise<
    ClientsApplicationPermission | undefined
  > {
    const clientApplicationPermission = await this.ormRepository.findOne({
      where: {
        method,
        base_url: baseUrl,
        path: path || null,
        client_application_id,
      },
    });
    return clientApplicationPermission;
  }

  public async findByIds(
    ids: number[],
  ): Promise<ClientsApplicationPermission[]> {
    const clientsApplicationPermissions = await this.ormRepository.findByIds(
      ids,
      {
        where: {
          client_application_id: this.user.client_application_id,
        },
      },
    );
    return clientsApplicationPermissions;
  }

  public async findAllClientsApplicationPermissions(): Promise<
    ClientsApplicationPermission[]
  > {
    const clientsApplicationPermissions = await this.ormRepository.find({
      where: {
        client_application_id: this.user.client_application_id,
      },
    });
    return clientsApplicationPermissions;
  }

  public async create(
    clientsApplicationpermissionData: ICreateClientsApplicationPermissionDTO,
  ): Promise<ClientsApplicationPermission> {
    const clientApplicationPermission = this.ormRepository.create(
      clientsApplicationpermissionData,
    );

    await this.ormRepository.save(clientApplicationPermission);

    return clientApplicationPermission;
  }

  public save(
    clientApplicationPermission: ClientsApplicationPermission,
  ): Promise<ClientsApplicationPermission> {
    return this.ormRepository.save(clientApplicationPermission);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({
      id,
      client_application_id: this.user.client_application_id,
    });
  }
}

export default ClientsApplicationPermissionsRepository;
