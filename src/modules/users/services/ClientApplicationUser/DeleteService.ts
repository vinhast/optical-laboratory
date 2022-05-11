import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('ClientsApplicationsUsersRepository')
    private clientsApplicationsUsersRepository: IClientsApplicationsUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const clientApplicationUser =
      await this.clientsApplicationsUsersRepository.findById(id);

    if (!clientApplicationUser) {
      throw new AppError('Client application user not found.', 404);
    }

    await this.cacheProvider.invalidate(`clients-applications-users-list`);

    await this.clientsApplicationsUsersRepository.delete(id);

    return true;
  }
}

export default DeleteUserService;
