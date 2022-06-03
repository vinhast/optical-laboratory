import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';

interface IRequest {
  id: number;
  client_application_id: number;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    client_application_id,
  }: IRequest): Promise<boolean> {
    const clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findById(
        id,
        client_application_id,
      );

    if (!clientApplicationUser) {
      throw new AppError('Client application user not found.', 404);
    }

    await this.cacheProvider.invalidate(`clients-applications-users-list`);
    await this.cacheProvider.invalidate(
      `clients-applications-users-list-${client_application_id}`,
    );

    await this.clientsApplicationsUsersRepository.delete(
      id,
      client_application_id,
    );

    return true;
  }
}

export default DeleteUserService;
