import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';

interface IRequest {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  cnpj: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;
  mobile?: string;
}

@injectable()
class UpdateService {
  constructor(
    @inject('ClientApplicationsRepository')
    private clientApplicationsRepository: IClientApplicationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(
    clientApplicationUpdate: IRequest,
  ): Promise<ClientApplication> {
    const id = clientApplicationUpdate.id;
    const cacheKey = `client-application-get-${id}`;
    let clientApplication = await this.cacheProvider.recover<
      ClientApplication | undefined
    >(cacheKey);

    if (!clientApplication) {
      clientApplication = await this.clientApplicationsRepository.findById(id);
    }

    if (!clientApplication) {
      throw new AppError('Client application not found.', 404);
    }

    clientApplication = {
      ...clientApplication,
      ...clientApplicationUpdate,
    };

    await this.cacheProvider.invalidate(`client-applications-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.clientApplicationsRepository.save(clientApplication);

    return clientApplication;
  }
}

export default UpdateService;
