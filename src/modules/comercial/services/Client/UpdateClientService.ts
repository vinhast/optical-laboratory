import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsRepository from '@modules/comercial/repositories/IClientsRepository';
import Client from '@modules/comercial/infra/typeorm/entities/Client';

interface IRequest {
  id: number;
  cnpj: string;
  company_name: string;
  table_id: number;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    cnpj,
    company_name,
    table_id,
  }: IRequest): Promise<Client> {
    const cacheKey = `client-get-${id}`;
    let client = await this.cacheProvider.recover<Client | undefined>(cacheKey);

    if (!client) {
      client = await this.clientsRepository.findById(id);
    }

    if (!client) {
      throw new AppError('Client not found.', 404);
    }

    client.cnpj = cnpj;
    client.company_name = company_name;
    client.table_id = table_id;

    await this.cacheProvider.invalidate(`clients-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
