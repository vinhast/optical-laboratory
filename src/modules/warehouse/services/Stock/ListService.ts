import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IStocksRepository from '@modules/warehouse/repositories/IStocksRepository';
import Stock from '@modules/warehouse/infra/typeorm/entities/Stock';

interface IRequest {
  empty?: boolean;
  pending?: boolean;
  sale?: boolean;
}

@injectable()
class ListService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ empty, pending, sale }: IRequest): Promise<Stock[]> {
    const cacheKey = `stocks-list`;
    let stocks = await this.cacheProvider.recover<Stock[]>(cacheKey);

    if (!stocks) {
      stocks = await this.stocksRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(stocks));
    }

    if (empty) {
      stocks = await this.stocksRepository.findEmptyStocks();
    }

    if (pending) {
      stocks = await this.stocksRepository.findPendingStocks();
    }

    if (sale) {
      stocks = await this.stocksRepository.findSaleStocks();
    }

    return stocks;
  }
}

export default ListService;
