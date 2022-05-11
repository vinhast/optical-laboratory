import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ISalesTablesPricesRepository from '@modules/users/repositories/ISalesTablesPricesRepository';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';

@injectable()
class ListService {
  constructor(
    @inject('SalesTablesPricesRepository')
    private salesTablesPricesRepository: ISalesTablesPricesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<SaleTablePrice[]> {
    const cacheKey = `sales-tables-prices-list`;
    let salesTablesPrices = await this.cacheProvider.recover<SaleTablePrice[]>(
      cacheKey,
    );

    if (!salesTablesPrices) {
      salesTablesPrices = await this.salesTablesPricesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(salesTablesPrices));
    }

    return salesTablesPrices;
  }
}

export default ListService;
