import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProvidersRepository from '@modules/commercial/repositories/IProvidersRepository';
import Provider from '@modules/commercial/infra/typeorm/entities/Provider';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
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
class UpdateService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(providerUpdate: IRequest): Promise<Provider> {
    const id = providerUpdate.id;
    const cacheKey = `provider-get-${id}`;
    let provider = await this.cacheProvider.recover<Provider | undefined>(
      cacheKey,
    );

    if (!provider) {
      provider = await this.providersRepository.findById(id);
    }

    if (!provider) {
      throw new AppError('Provider not found.', 404);
    }

    provider = {
      ...provider,
      ...providerUpdate,
    };

    await this.cacheProvider.invalidate(`providers-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.providersRepository.save(provider);

    return provider;
  }
}

export default UpdateService;
