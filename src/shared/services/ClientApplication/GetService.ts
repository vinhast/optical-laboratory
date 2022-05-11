import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';

@injectable()
class GetService {
  constructor(
    @inject('ClientApplicationsRepository')
    private clientApplicationsRepository: IClientApplicationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<ClientApplication> {
    const cacheKey = `client-application-get-${id}`;
    let clientApplication = await this.cacheProvider.recover<
      ClientApplication | undefined
    >(cacheKey);

    if (!clientApplication) {
      clientApplication = await this.clientApplicationsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(clientApplication));
    }

    if (!clientApplication) {
      throw new AppError('Client application not found.', 404);
    }

    return clientApplication;
  }
}

export default GetService;
