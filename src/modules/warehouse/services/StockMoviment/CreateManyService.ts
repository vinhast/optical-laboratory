import { inject, injectable } from 'tsyringe';

import StockMoviments from '@modules/warehouse/infra/typeorm/entities/StockMoviment';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  stocks: { cylindrical: number; spherical?: number; value?: number }[];
}

@injectable()
class CreateService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ stocks }: IRequest): Promise<StockMoviments[]> {
    const stockMoviment = await this.stockMovimentsRepository.createMany(
      stocks,
    );
    await this.cacheProvider.invalidate(`stock-moviments-list`);
    await this.cacheProvider.invalidatePrefix(`product-category-get`);

    return stockMoviment;
  }
}

export default CreateService;
