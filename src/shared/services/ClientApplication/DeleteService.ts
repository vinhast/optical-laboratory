import { inject, injectable } from 'tsyringe';

import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('ClientApplicationsRepository')
    private clientApplicationsRepository: IClientApplicationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const clientApplication = await this.clientApplicationsRepository.findById(
      id,
    );

    if (!clientApplication) {
      throw new AppError('Client application not found.', 404);
    }

    await this.cacheProvider.invalidate(`client-applications-list`, true);

    await this.clientApplicationsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
