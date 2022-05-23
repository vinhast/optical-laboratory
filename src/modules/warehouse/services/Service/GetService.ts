import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Service from '@modules/warehouse/infra/typeorm/entities/Service';
import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class GetService {
  constructor(
    @inject('ProductsRepository')
    private servicesRepository: IProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Service> {
    const cacheKey = `service-get-${id}`;
    let service = await this.cacheProvider.recover<Service | undefined>(
      cacheKey,
    );

    if (!service) {
      service = await this.servicesRepository.findById(id);

      await this.cacheProvider.save(cacheKey, classToClass(service));
    }

    if (!service) {
      throw new AppError('Service not found.', 404);
    }

    return service;
  }
}

export default GetService;
