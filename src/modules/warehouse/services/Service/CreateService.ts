import { inject, injectable } from 'tsyringe';

import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Service from '@modules/warehouse/infra/typeorm/entities/Service';
import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';

interface IRequest {
  name: string;
  description?: string;
  price?: string;
  tables: SaleTablePriceService[];
}

@injectable()
class CreateService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    price,
    name,
    description,
    tables,
  }: IRequest): Promise<Service> {
    const service = await this.servicesRepository.create({
      name,
      description,
      price,
      tables,
    });

    await this.cacheProvider.invalidate(`services-list`);

    return service;
  }
}

export default CreateService;
