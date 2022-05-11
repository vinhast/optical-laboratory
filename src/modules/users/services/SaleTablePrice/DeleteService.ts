import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ISalesTablesPricesRepository from '@modules/users/repositories/ISalesTablesPricesRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('SalesTablesPricesRepository')
    private salesTablesPricesRepository: ISalesTablesPricesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const saleTablePrice = await this.salesTablesPricesRepository.findById(id);

    if (!saleTablePrice) {
      throw new AppError('saleTablePrice not found.', 404);
    }

    await this.cacheProvider.invalidate(`sales-tables-prices-list`);
    await this.cacheProvider.invalidate(`sale-table-price-${id}`);

    await this.salesTablesPricesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
