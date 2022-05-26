import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Service from '@modules/warehouse/infra/typeorm/entities/Service';
import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Service[]> {
    const cacheKey = `services-list`;
    let services = await this.cacheProvider.recover<Service[]>(cacheKey);
    if (!services) {
      services = await this.servicesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(services));
    }
    return services;
  }
}

export default ListService;
