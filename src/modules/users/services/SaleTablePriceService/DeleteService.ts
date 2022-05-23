import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ISalesTablesPricesServicesRepository from '@modules/users/repositories/ISalesTablesPricesServicesRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('SalesTablesPricesServicesRepository')
    private salesTablesPricesServicesRepository: ISalesTablesPricesServicesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const saleTablePriceService =
      await this.salesTablesPricesServicesRepository.findById(id);

    if (!saleTablePriceService) {
      throw new AppError('saleTablePriceService not found.', 404);
    }

    await this.cacheProvider.invalidate(`sales-tables-prices-services-list`);
    await this.cacheProvider.invalidate(`sale-table-price-service-get-${id}`);

    await this.salesTablesPricesServicesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
