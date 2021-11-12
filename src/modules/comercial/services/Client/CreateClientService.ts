import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsRepository from '@modules/comercial/repositories/IClientsRepository';
import Client from '@modules/comercial/infra/typeorm/entities/Client';

interface IRequest {
  cnpj: string;
  company_name: string;
  table_id: number;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(request: IRequest): Promise<Client> {
    const client = await this.clientsRepository.create(request);

    await this.cacheProvider.invalidate('clients-list');

    return client;
  }
}

export default CreateClientService;
