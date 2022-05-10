import { inject, injectable } from 'tsyringe';

import StockMoviments from '@modules/warehouse/infra/typeorm/entities/StockMoviment';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
  product_id: number;
  order_id?: number;
  financial_moviment_id?: number;
  user_id: number;
  description: string;
  type: string;
  origin: string;
  quantity: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(stockMovimentUpdate: IRequest): Promise<StockMoviments> {
    const id = stockMovimentUpdate.id;
    const cacheKey = `client-get-${id}`;
    let stockMoviment = await this.cacheProvider.recover<
      StockMoviments | undefined
    >(cacheKey);
    if (!stockMoviment) {
      stockMoviment = await this.stockMovimentsRepository.findById(id);
    }

    if (!stockMoviment) {
      throw new AppError('Stock moviment not found.', 404);
    }
    stockMoviment = {
      ...stockMoviment,
      ...stockMovimentUpdate,
    };

    await this.cacheProvider.invalidate(`stock-moviments-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.stockMovimentsRepository.save(stockMoviment);

    return stockMoviment;
  }
}

export default UpdateService;
