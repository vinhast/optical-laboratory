import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import ISalesTablesPricesRepository from '@modules/users/repositories/ISalesTablesPricesRepository';
import ICreateSaleTablePriceDTO from '@modules/users/dtos/ICreateSaleTablePriceDTO';

interface IRequest extends ICreateSaleTablePriceDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('SalesTablesPricesRepository')
    private salesTablesPricesRepository: ISalesTablesPricesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    saleTablePriceUpdate: IRequest,
  ): Promise<SaleTablePrice> {
    const id = saleTablePriceUpdate.id;
    const cacheKey = `sale-table-price-get-${id}`;
    let saleTablePrice = await this.cacheProvider.recover<
      SaleTablePrice | undefined
    >(cacheKey);

    if (!saleTablePrice) {
      saleTablePrice = await this.salesTablesPricesRepository.findById(id);
    }

    if (!saleTablePrice) {
      throw new AppError('SaleTablePrice not found.', 404);
    }

    saleTablePrice = {
      ...saleTablePrice,
      ...saleTablePriceUpdate,
    };

    await this.cacheProvider.invalidate(`sales-tables-prices-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.salesTablesPricesRepository.save(saleTablePrice);

    return saleTablePrice;
  }
}

export default UpdateService;
