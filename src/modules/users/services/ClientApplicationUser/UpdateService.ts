import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

interface IRequest {
  id: number;
  client_application_role_id?: number;
  client_application_id: number;
  username: string;
  password: string;
  active: boolean;
  token?: string;
  token_validate?: Date;
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
    const cacheKey = `client-application-user-get-${id}`;
    let clientApplicationUser = await this.cacheProvider.recover<
      ClientApplicationUser | undefined
    >(cacheKey);

    if (!clientApplicationUser) {
      clientApplicationUser =
        await this.clientsApplicationsUsersRepository.findById(
          id,
          clientApplicationUserUpdate.client_application_id,
        );
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

    delete clientApplicationUser.clientApplication;
    delete clientApplicationUser.clientApplicationUserPermissions;

    await this.cacheProvider.invalidate(`clients-applications-users-list`);
    await this.cacheProvider.invalidate(
      `clients-applications-users-list-${clientApplicationUserUpdate.client_application_id}`,
    );

    await this.cacheProvider.invalidate(cacheKey);

    await this.clientsApplicationsUsersRepository.save(clientApplicationUser);

    return clientApplicationUser;
  }
}

export default UpdateUserService;
