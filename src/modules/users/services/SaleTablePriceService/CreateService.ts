import { inject, injectable } from 'tsyringe';

import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';
import ISalesTablesPricesServicesRepository from '@modules/users/repositories/ISalesTablesPricesServicesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreateSaleTablePriceServiceDTO from '@modules/users/dtos/ICreateSaleTablePriceServiceDTO';

@injectable()
class CreateService {
  constructor(
    @inject('SalesTablesPricesServicesRepository')
    private salesTablesServicesRepository: ISalesTablesPricesServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    request: ICreateSaleTablePriceServiceDTO,
  ): Promise<SaleTablePriceService> {
    const saleTablePriceService =
      await this.salesTablesServicesRepository.create(request);

    await this.cacheProvider.invalidate('sales-tables-prices-services-list');

    return saleTablePriceService;
  }
}

export default CreateService;
