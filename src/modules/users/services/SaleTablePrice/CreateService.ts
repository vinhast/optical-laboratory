import { inject, injectable } from 'tsyringe';

import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import ISalesTablesPricesRepository from '@modules/users/repositories/ISalesTablesPricesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreateSaleTablePriceDTO from '@modules/users/dtos/ICreateSaleTablePriceDTO';

@injectable()
class CreateService {
  constructor(
    @inject('SalesTablesPricesRepository')
    private salesTablesRepository: ISalesTablesPricesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    request: ICreateSaleTablePriceDTO,
  ): Promise<SaleTablePrice> {
    const saleTablePrice = await this.salesTablesRepository.create(request);

    await this.cacheProvider.invalidate('sales-tables-prices-list');

    return saleTablePrice;
  }
}

export default CreateService;
