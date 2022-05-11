import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

@injectable()
class GetUserService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<ClientApplicationUser> {
    const cacheKey = `client-application-user-get-${id}`;
    let clientApplicationUser = await this.cacheProvider.recover<
      ClientApplicationUser | undefined
    >(cacheKey);

    if (!clientApplicationUser) {
      clientApplicationUser =
        await this.clientsApplicationsUsersRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(clientApplicationUser));
    }

    if (!clientApplicationUser) {
      throw new AppError('Client application user not found.', 404);
    }

    return clientApplicationUser;
  }
}

export default GetUserService;
