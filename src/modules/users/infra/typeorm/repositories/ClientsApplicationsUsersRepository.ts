import { getRepository, IsNull, Not, Repository } from 'typeorm';

import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ICreateClientApplicationUserDTO from '@modules/users/dtos/ICreateClientApplicationUserDTO';

import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';
import httpContext from 'express-http-context';

class ClientsApplicationsUsersRepository
  implements IClientsApplicationsUsersRepository
{
  private ormRepository: Repository<ClientApplicationUser>;
  private user: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    this.ormRepository = getRepository(ClientApplicationUser);
    this.user = httpContext.get('user');
  }

  public async findAll(): Promise<ClientApplicationUser[]> {
    const clientsApplicationsUsers = await this.ormRepository.find({
      where: {
        client_application_id: this.user.client_application_id,
      },
    });
    return clientsApplicationsUsers;
  }
  public async findByClientApplication(
    client_application_id: number,
  ): Promise<ClientApplicationUser[]> {
    const clientsApplicationsUsers = await this.ormRepository.find({
      where: {
        client_application_id,
      },
      relations: ['clientApplicationRole'],
    });
    return clientsApplicationsUsers;
  }

  public async findByUsername(
    username: string,
    client_application_id?: number,
  ): Promise<ClientApplicationUser | undefined> {
    const clientApplicationUser = await this.ormRepository.findOne({
      where: {
        username,
        client_application_id:
          this.user?.client_application_id ||
          client_application_id ||
          Not(IsNull()),
      },
      relations: ['clientApplication'],
    });
    return clientApplicationUser;
  }

  public async findById(
    id: number,
    client_application_id?: number,
  ): Promise<ClientApplicationUser | undefined> {
    const clientApplicationUser = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id:
          this.user?.client_application_id || client_application_id,
      },
      relations: ['clientApplication', 'clientApplicationUserPermissions'],
    });
    return clientApplicationUser;
  }

  public async findByToken(
    token: string,
  ): Promise<ClientApplicationUser | undefined> {
    const clientApplicationUser = await this.ormRepository.findOne({
      where: {
        token,
        client_application_id: this.user.client_application_id,
      },
    });
    return clientApplicationUser;
  }

  public async create(
    clientApplicationUserData: ICreateClientApplicationUserDTO,
  ): Promise<ClientApplicationUser> {
    const clientApplicationUser = this.ormRepository.create(
      clientApplicationUserData,
    );

    await this.ormRepository.save(clientApplicationUser);

    return clientApplicationUser;
  }

  public save(
    clientApplicationUser: ClientApplicationUser,
  ): Promise<ClientApplicationUser> {
    return this.ormRepository.save(clientApplicationUser);
  }

  public async delete(
    id: number,
    client_application_id: number,
  ): Promise<void> {
    await this.ormRepository.delete({
      id,
      client_application_id:
        this.user.client_application_id || client_application_id,
    });
  }
}

export default ClientsApplicationsUsersRepository;
