import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

@injectable()
class ListService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ClientApplicationUser[]> {
    const cacheKey = `clients-applications-users-list`;
    let clientsApplicationsUsers = await this.cacheProvider.recover<
      ClientApplicationUser[]
    >(cacheKey);
    if (!clientsApplicationsUsers) {
      clientsApplicationsUsers =
        await this.clientsApplicationsUsersRepository.findAll();
      await this.cacheProvider.save(
        cacheKey,
        classToClass(clientsApplicationsUsers),
      );
    }

    return clientsApplicationsUsers;
  }
}

export default ListService;
