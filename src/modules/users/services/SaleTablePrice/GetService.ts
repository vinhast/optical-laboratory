import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import ISalesTablesPricesRepository from '@modules/users/repositories/ISalesTablesPricesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('SalesTablesPricesRepository')
    private salesTablesPricesRepository: ISalesTablesPricesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<SaleTablePrice> {
    const cacheKey = `sale-table-price-get-${id}`;
    let saleTablePrice = await this.cacheProvider.recover<
      SaleTablePrice | undefined
    >(cacheKey);

    if (!saleTablePrice) {
      saleTablePrice = await this.salesTablesPricesRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(saleTablePrice));
    }

    if (!saleTablePrice) {
      throw new AppError('saleTablePrice not found.', 404);
    }

    return saleTablePrice;
  }
}

export default GetService;
