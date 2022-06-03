import { getRepository, Repository } from 'typeorm';

import ICreateClientApplicationRoleDTO from '@modules/users/dtos/ICreateClientApplicationRoleDTO';
import IClientsApplicationRolesRepository from '@modules/users/repositories/IClientsApplicationRolesRepository';
import httpContext from 'express-http-context';
import ClientApplicationRole from '../entities/ClientApplicationRole';

class ClientsApplicationRolesRepository
  implements IClientsApplicationRolesRepository
{
  private ormRepository: Repository<ClientApplicationRole>;
  private user: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(ClientApplicationRole);
    this.ormRepository = repository;
    this.user = httpContext.get('user');
  }

  public async findAll(): Promise<ClientApplicationRole[]> {
    const clientsApplicationRoles = await this.ormRepository.find({
      client_application_id: this.user.client_application_id,
    });
    return clientsApplicationRoles;
  }

  public async findByClientApplication(
    client_application_id: number,
  ): Promise<ClientApplicationRole[]> {
    const clientsApplicationRoles = await this.ormRepository.find({
      where: {
        client_application_id,
      },
    });
    return clientsApplicationRoles;
  }

  public async findByName(
    name: string,
  ): Promise<ClientApplicationRole | undefined> {
    const clientApplicationRole = await this.ormRepository.findOne({
      name,
      client_application_id: this.user.client_application_id,
    });
    return clientApplicationRole;
  }

  public async findById(
    id: number,
    client_application_id?: number,
  ): Promise<ClientApplicationRole | undefined> {
    const clientApplicationRole = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id,
      },
      relations: ['clientApplicationPermissions'],
    });
    return clientApplicationRole;
  }

  public async create(
    roleData: ICreateClientApplicationRoleDTO,
  ): Promise<ClientApplicationRole> {
    const clientApplicationRole = this.ormRepository.create(roleData);

    await this.ormRepository.save(clientApplicationRole);

    return clientApplicationRole;
  }

  public save(
    clientApplicationRole: ClientApplicationRole,
  ): Promise<ClientApplicationRole> {
    return this.ormRepository.save(clientApplicationRole);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({
      id,
      client_application_id: this.user.client_application_id,
    });
  }
}

export default ClientsApplicationRolesRepository;
