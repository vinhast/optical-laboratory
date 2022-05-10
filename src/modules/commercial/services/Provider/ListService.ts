import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IProvidersRepository from '@modules/commercial/repositories/IProvidersRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Provider from '../../infra/typeorm/entities/Provider';

@injectable()
class ListService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Provider[]> {
    const cacheKey = `provider-list`;
    let provider = await this.cacheProvider.recover<Provider[]>(cacheKey);

    if (!provider) {
      provider = await this.providersRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(Provider));
    }

    return provider;
  }
}

export default ListService;
