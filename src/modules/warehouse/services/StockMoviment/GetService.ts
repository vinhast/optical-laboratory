import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import StockMoviment from '@modules/warehouse/infra/typeorm/entities/StockMoviment';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class GetService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<StockMoviment> {
    const cacheKey = `stock-moviment-get-${id}`;
    let stockMoviment = await this.cacheProvider.recover<
      StockMoviment | undefined
    >(cacheKey);

    if (!stockMoviment) {
      stockMoviment = await this.stockMovimentsRepository.findById(id);

      await this.cacheProvider.save(cacheKey, classToClass(stockMoviment));
    }

    if (!stockMoviment) {
      throw new AppError('Stock moviment not found.', 404);
    }

    return stockMoviment;
  }
}

export default GetService;
