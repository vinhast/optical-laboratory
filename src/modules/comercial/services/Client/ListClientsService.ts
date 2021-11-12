import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsRepository from '@modules/comercial/repositories/IClientsRepository';
import Client from '@modules/comercial/infra/typeorm/entities/Client';

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Client[]> {
    const cacheKey = `clients-list`;
    let clients = await this.cacheProvider.recover<Client[]>(cacheKey);

    if (!clients) {
      clients = await this.clientsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(clients));
    }

    return clients;
  }
}

export default ListClientsService;
