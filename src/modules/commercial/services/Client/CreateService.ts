import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';
import Client from '@modules/commercial/infra/typeorm/entities/Client';

interface IRequest {
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
class CreateService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(request: IRequest): Promise<Client> {
    const client = await this.clientsRepository.create(request);

    await this.cacheProvider.invalidate(`clients-list`);

    return client;
  }
}

export default CreateService;
