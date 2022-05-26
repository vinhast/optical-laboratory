import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ISalesTablesPricesServicesRepository from '@modules/users/repositories/ISalesTablesPricesServicesRepository';
import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';

@injectable()
class ListService {
  constructor(
    @inject('SalesTablesPricesServicesRepository')
    private salesTablesPricesServicesRepository: ISalesTablesPricesServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<SaleTablePriceService[]> {
    const cacheKey = `sales-tables-prices-services-list`;
    let salesTablesPricesServices = await this.cacheProvider.recover<
      SaleTablePriceService[]
    >(cacheKey);

    if (!salesTablesPricesServices) {
      salesTablesPricesServices =
        await this.salesTablesPricesServicesRepository.findAll();
      await this.cacheProvider.save(
        cacheKey,
        classToClass(salesTablesPricesServices),
      );
    }

    return salesTablesPricesServices;
  }
}

export default ListService;
