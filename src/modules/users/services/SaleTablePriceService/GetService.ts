import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';
import ISalesTablesPricesServicesRepository from '@modules/users/repositories/ISalesTablesPricesServicesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('SalesTablesPricesServicesRepository')
    private salesTablesPricesServicesRepository: ISalesTablesPricesServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<SaleTablePriceService> {
    const cacheKey = `sale-table-price-service-get-${id}`;
    let saleTablePriceService = await this.cacheProvider.recover<
      SaleTablePriceService | undefined
    >(cacheKey);

    if (!saleTablePriceService) {
      saleTablePriceService =
        await this.salesTablesPricesServicesRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(saleTablePriceService));
    }

    if (!saleTablePriceService) {
      throw new AppError('saleTablePriceService not found.', 404);
    }

    return saleTablePriceService;
  }
}

export default GetService;
