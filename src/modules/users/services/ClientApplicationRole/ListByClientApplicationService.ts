import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IClientsApplicationRolesRepository from '@modules/users/repositories/IClientsApplicationRolesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplicationRole from '@modules/users/infra/typeorm/entities/ClientApplicationRole';

@injectable()
class ListByClientApplicationService {
  constructor(
    @inject('ClientsApplicationRolesRepository')
    private clientsApplicationRolesRepository: IClientsApplicationRolesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    client_application_id: number,
  ): Promise<ClientApplicationRole[]> {
    const cacheKey = `clients-applications-roles-list-${client_application_id}`;
    let clientsApplicationsRoles = await this.cacheProvider.recover<
      ClientApplicationRole[]
    >(cacheKey);
    if (!clientsApplicationsRoles) {
      clientsApplicationsRoles =
        await this.clientsApplicationRolesRepository.findByClientApplication(
          client_application_id,
        );
      await this.cacheProvider.save(
        cacheKey,
        classToClass(clientsApplicationsRoles),
      );
    }

    return clientsApplicationsRoles;
  }
}

export default ListByClientApplicationService;
