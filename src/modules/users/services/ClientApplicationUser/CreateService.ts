import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';
import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  role_id?: number;
  client_application_id: number;
  username: string;
  password: string;
  active: boolean;
  user_token?: string;
  user_token_validate?: number;
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
    role_id,
    username,
    password,
    active,
    client_application_id,
    user_token_validate,
    user_token,
  }: IRequest): Promise<ClientApplicationUser> {
    let clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findByUsername(username);
    if (clientApplicationUser) {
      throw new AppError('Username already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    clientApplicationUser =
      await this.clientsApplicationsUsersRepository.create({
        role_id,
        username,
        password: hashedPassword,
        active,
        client_application_id,
        user_token_validate,
        user_token,
      });

    await this.cacheProvider.invalidatePrefix('clients-applications-user-list');

    return clientApplicationUser;
  }
}

export default CreateService;
