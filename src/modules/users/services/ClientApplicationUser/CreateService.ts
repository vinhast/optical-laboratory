import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';
import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  client_application_role_id?: number;
  client_application_id: number;
  email: string;
  username: string;
  password: string;
  active: boolean;
  token?: string;
  token_validate?: Date;
}

@injectable()
class CreateService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    client_application_role_id,
    username,
    password,
    active,
    client_application_id,
    token_validate,
    token,
    email,
  }: IRequest): Promise<ClientApplicationUser> {
    let clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findByUsername(
        username,
        client_application_id,
      );
    if (clientApplicationUser) {
      throw new AppError('Username already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    clientApplicationUser =
      await this.clientsApplicationsUsersRepository.create({
        client_application_role_id,
        username,
        password: hashedPassword,
        active,
        client_application_id,
        token_validate,
        token,
        email,
      });

    await this.cacheProvider.invalidate('clients-applications-users-list');
    await this.cacheProvider.invalidate(
      `clients-applications-users-list-${client_application_id}`,
    );

    return clientApplicationUser;
  }
}

export default CreateService;
