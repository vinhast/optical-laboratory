import { getRepository, Repository } from 'typeorm';

import IProvidersRepository from '@modules/commercial/repositories/IProvidersRepository';
import ICreateProviderDTO from '@modules/commercial/dtos/ICreateProviderDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import Provider from '../entities/Provider';

class ProvidersRepository
  extends MainRepository
  implements IProvidersRepository
{
  private ormRepository: Repository<Provider>;

  constructor() {
    const repository = getRepository(Provider);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(ProviderData: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create(ProviderData);

    await this.ormRepository.save(provider);

    return provider;
  }

  public save(provider: Provider): Promise<Provider> {
    return this.ormRepository.save(provider);
  }
}

export default ProvidersRepository;
