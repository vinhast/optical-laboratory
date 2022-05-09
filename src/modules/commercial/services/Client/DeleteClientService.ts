import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('client not found.', 404);
    }

    await this.cacheProvider.invalidate(`clients-list`);
    await this.cacheProvider.invalidate(`client-get-${id}`);

    await this.clientsRepository.delete(id);

    return true;
  }
}

export default DeleteClientService;
