import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('StockMovimentsRepository')
    private stockMovimentsRepository: IStockMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const stockMoviment = await this.stockMovimentsRepository.findById(id);

    if (!stockMoviment) {
      throw new AppError('Stock moviment not found.', 404);
    }

    await this.stockMovimentsRepository.delete(id);
    await this.cacheProvider.invalidate(`stock-moviments-list`);
    return true;
  }
}

export default DeleteService;
