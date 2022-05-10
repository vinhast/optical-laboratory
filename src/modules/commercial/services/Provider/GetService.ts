import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IProvidersRepository from '@modules/commercial/repositories/IProvidersRepository';
import Provider from '@modules/commercial/infra/typeorm/entities/Provider';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Provider> {
    const cacheKey = `provider-get-${id}`;
    let provider = await this.cacheProvider.recover<Provider | undefined>(
      cacheKey,
    );

    if (!provider) {
      provider = await this.providersRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(Provider));
    }

    if (!provider) {
      throw new AppError('Provider not found.', 404);
    }

    return provider;
  }
}

export default GetService;
