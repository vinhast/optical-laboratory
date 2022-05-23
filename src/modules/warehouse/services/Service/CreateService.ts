import { inject, injectable } from 'tsyringe';

import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Service from '@modules/warehouse/infra/typeorm/entities/Service';

interface IRequest {
  price?: string;
  active: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ price, active }: IRequest): Promise<Service> {
    const service = await this.servicesRepository.create({
      price,
      active,
    });

    await this.cacheProvider.invalidate(`services-list`);

    return service;
  }
}

export default CreateService;
