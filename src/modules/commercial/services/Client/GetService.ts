import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';
import Client from '@modules/commercial/infra/typeorm/entities/Client';

@injectable()
class GetService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Client> {
    const cacheKey = `client-get-${id}`;
    let client;

    if (!client) {
      client = await this.clientsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(client));
    }

    if (!client) {
      throw new AppError('client not found.', 404);
    }

    return client;
  }
}

export default GetService;
