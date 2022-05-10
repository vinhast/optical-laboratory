import { inject, injectable } from 'tsyringe';

import StockMoviments from '@modules/warehouse/infra/typeorm/entities/StockMoviment';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
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
class CreateService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    description,
    origin,
    product_id,
    quantity,
    type,
    user_id,
    financial_moviment_id,
    order_id,
  }: IRequest): Promise<StockMoviments> {
    const stockMoviment = await this.stockMovimentsRepository.create({
      description,
      origin,
      product_id,
      quantity,
      type,
      user_id,
      financial_moviment_id,
      order_id,
    });
    await this.cacheProvider.invalidate(`stock-moviments-list`);

    return stockMoviment;
  }
}

export default CreateService;
