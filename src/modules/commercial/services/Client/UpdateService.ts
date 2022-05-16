import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';
import Client from '@modules/commercial/infra/typeorm/entities/Client';

interface IRequest {
  id: number;
  table_id: number;
  company_name: string;
  company_social_name?: string;
  cnpj: string;
  state_registration?: string;
  city_registration?: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  ibge?: number;
  phone_1?: string;
  phone_2?: string;
  mobile?: string;
  email?: string;
  note?: string;
  shipment_method?: string;
  payment_method?: string;
  active?: string;
  cnpjSearch?: string;
}

@injectable()
class UpdateService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(clientUpdate: IRequest): Promise<Client> {
    const id = clientUpdate.id;
    const cacheKey = `client-get-${id}`;
    let client = await this.cacheProvider.recover<Client | undefined>(cacheKey);

    if (!client) {
      client = await this.clientsRepository.findById(id);
    }

    if (!client) {
      throw new AppError('Client not found.', 404);
    }
    client = {
      ...client,
      ...clientUpdate,
    };

    await this.cacheProvider.invalidate(`client-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.clientsRepository.save(client);

    return client;
  }
}

export default UpdateService;
