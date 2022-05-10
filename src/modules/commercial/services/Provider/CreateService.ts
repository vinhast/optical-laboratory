import { inject, injectable } from 'tsyringe';

import IProvidersRepository from '@modules/commercial/repositories/IProvidersRepository';
import Provider from '@modules/commercial/infra/typeorm/entities/Provider';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  company_social_name: string;
  company_name: string;
  cnpj?: string;
  phone: string;
  mobile?: string;
  email?: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  zip_code?: string;
  city?: string;
  state?: string;
  ibge?: number;
  note?: string;
  active: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    company_social_name,
    company_name,
    cnpj,
    phone,
    mobile,
    email,
    street,
    number,
    complement,
    district,
    zip_code,
    city,
    state,
    ibge,
    note,
    active,
  }: IRequest): Promise<Provider> {
    const provider = await this.providersRepository.create({
      company_social_name,
      company_name,
      cnpj,
      phone,
      mobile,
      email,
      street,
      number,
      complement,
      district,
      zip_code,
      city,
      state,
      ibge,
      note,
      active,
    });

    await this.cacheProvider.invalidatePrefix('provider-list');

    return provider;
  }
}

export default CreateService;
