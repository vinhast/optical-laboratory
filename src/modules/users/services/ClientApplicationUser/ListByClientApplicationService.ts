import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';

@injectable()
class ListByClientApplicationService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    client_application_id: number,
  ): Promise<ClientApplicationUser[]> {
    const cacheKey = `clients-applications-users-list-${client_application_id}`;
    let clientsApplicationsUsers = await this.cacheProvider.recover<
      ClientApplicationUser[]
    >(cacheKey);
    if (!clientsApplicationsUsers) {
      clientsApplicationsUsers =
        await this.clientsApplicationsUsersRepository.findByClientApplication(
          client_application_id,
        );
      await this.cacheProvider.save(
        cacheKey,
        classToClass(clientsApplicationsUsers),
      );
    }

    return clientsApplicationsUsers;
  }
}

export default ListByClientApplicationService;
