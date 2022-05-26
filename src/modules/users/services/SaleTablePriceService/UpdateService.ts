import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';
import ISalesTablesPricesServicesRepository from '@modules/users/repositories/ISalesTablesPricesServicesRepository';
import ICreateSaleTablePriceServiceDTO from '@modules/users/dtos/ICreateSaleTablePriceServiceDTO';

interface IRequest extends ICreateSaleTablePriceServiceDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('SalesTablesPricesServicesRepository')
    private salesTablesPricesServicesRepository: ISalesTablesPricesServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    saleTablePriceServiceUpdate: IRequest,
  ): Promise<SaleTablePriceService> {
    const id = saleTablePriceServiceUpdate.id;
    const cacheKey = `sale-table-price-service-get-${id}`;
    let saleTablePriceService = await this.cacheProvider.recover<
      SaleTablePriceService | undefined
    >(cacheKey);

    if (!saleTablePriceService) {
      saleTablePriceService =
        await this.salesTablesPricesServicesRepository.findById(id);
    }

    if (!saleTablePriceService) {
      throw new AppError('SaleTablePriceService not found.', 404);
    }

    saleTablePriceService = {
      ...saleTablePriceService,
      ...saleTablePriceServiceUpdate,
    };

    await this.cacheProvider.invalidate(`sales-tables-prices-services-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.salesTablesPricesServicesRepository.save(saleTablePriceService);

    return saleTablePriceService;
  }
}

export default UpdateService;
