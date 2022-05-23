import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const service = await this.servicesRepository.findById(id);

    if (!service) {
      throw new AppError('Service not found.', 404);
    }

    await this.servicesRepository.delete(id);
    await this.cacheProvider.invalidate(`services-list`);
    return true;
  }
}

export default DeleteService;
