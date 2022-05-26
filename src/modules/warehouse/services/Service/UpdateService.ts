import { inject, injectable } from 'tsyringe';

import Service from '@modules/warehouse/infra/typeorm/entities/Service';
import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';

interface IRequest {
  id: number;
  name: string;
  description?: string;
  price?: string;
  tables: SaleTablePriceService[];
}
@injectable()
class UpdateService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(serviceUpdate: IRequest): Promise<Service> {
    const id = serviceUpdate.id;
    const cacheKey = `service-get-${id}`;
    let service = await this.cacheProvider.recover<Service | undefined>(
      cacheKey,
    );
    if (!service) {
      service = await this.servicesRepository.findById(id);
    }
    if (!service) {
      throw new AppError('Service not found.', 404);
    }

    service = {
      ...service,
      ...serviceUpdate,
    };

    await this.cacheProvider.invalidate(`services-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.servicesRepository.save(service);

    return service;
  }
}

export default UpdateService;
