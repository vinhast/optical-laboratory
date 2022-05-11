import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';

@injectable()
class ListService {
  constructor(
    @inject('ClientApplicationsRepository')
    private clientApplicationsRepository: IClientApplicationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ClientApplication[]> {
    const cacheKey = `client-applications-list`;
    let clientApplication = await this.cacheProvider.recover<
      ClientApplication[]
    >(cacheKey);
    if (!clientApplication) {
      clientApplication = await this.clientApplicationsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(clientApplication));
    }

    return clientApplication;
  }
}

export default ListService;
