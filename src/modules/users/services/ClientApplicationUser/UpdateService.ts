import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

interface IRequest {
  id: number;
  role_id?: number;
  client_application_id: number;
  username: string;
  password: string;
  active: boolean;
  user_token?: string;
  user_token_validate?: number;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    clientApplicationUserUpdate: IRequest,
  ): Promise<ClientApplicationUser> {
    const id = clientApplicationUserUpdate.id;
    const password = clientApplicationUserUpdate.password;
    const cacheKey = `user-get-${id}`;
    let clientApplicationUser = await this.cacheProvider.recover<
      ClientApplicationUser | undefined
    >(cacheKey);

    if (!clientApplicationUser) {
      clientApplicationUser =
        await this.clientsApplicationsUsersRepository.findById(id);
    }

    if (!clientApplicationUser) {
      throw new AppError('Client application user not found.', 404);
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await this.hashProvider.generateHash(password);
    }

    clientApplicationUser = {
      ...clientApplicationUser,
      ...clientApplicationUserUpdate,
      password: hashedPassword || clientApplicationUser.password,
    };

    await this.cacheProvider.invalidate(`clients-applications-users-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.clientsApplicationsUsersRepository.save(clientApplicationUser);

    return clientApplicationUser;
  }
}

export default UpdateUserService;
