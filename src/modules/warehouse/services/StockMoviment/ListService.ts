import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import StockMoviment from '@modules/warehouse/infra/typeorm/entities/StockMoviment';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<StockMoviment[]> {
    const cacheKey = `stock-moviments-list`;
    let stockMoviments = await this.cacheProvider.recover<StockMoviment[]>(
      cacheKey,
    );
    if (!stockMoviments) {
      stockMoviments = await this.stockMovimentsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(stockMoviments));
    }
    return stockMoviments;
  }
}

export default ListService;
