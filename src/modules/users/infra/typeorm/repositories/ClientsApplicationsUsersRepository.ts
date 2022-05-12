import { getRepository, Repository } from 'typeorm';

import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ICreateClientApplicationUserDTO from '@modules/users/dtos/ICreateClientApplicationUserDTO';

import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

class ClientsApplicationsUsersRepository
  implements IClientsApplicationsUsersRepository
{
  private ormRepository: Repository<ClientApplicationUser>;

  constructor() {
    this.ormRepository = getRepository(ClientApplicationUser);
  }

  public async findAll(): Promise<ClientApplicationUser[]> {
    const clientsApplicationsUsers = await this.ormRepository.find();
    return clientsApplicationsUsers;
  }

  public async findByEmail(
    email: string,
  ): Promise<ClientApplicationUser | undefined> {
    const clientApplicationUser = await this.ormRepository.findOne({
      where: { email },
      relations: ['clientApplication'],
    });
    return clientApplicationUser;
  }

  public async findByUsername(
    username: string,
  ): Promise<ClientApplicationUser | undefined> {
    const clientApplicationUser = await this.ormRepository.findOne({
      where: { username },
      relations: ['clientApplication'],
    });
    return clientApplicationUser;
  }

  public async findById(
    id: number,
  ): Promise<ClientApplicationUser | undefined> {
    const clientApplicationUser = await this.ormRepository.findOne(id, {
      relations: ['clientApplication'],
    });
    return clientApplicationUser;
  }

  public async findByToken(
    token: string,
  ): Promise<ClientApplicationUser | undefined> {
    const clientApplicationUser = await this.ormRepository.findOne({
      where: {
        token,
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

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ClientsApplicationsUsersRepository;
