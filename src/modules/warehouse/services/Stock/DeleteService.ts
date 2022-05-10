import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IStocksRepository from '@modules/warehouse/repositories/IStocksRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const cacheKey = `stock-get:${id}`;
    const stock = await this.stocksRepository.findById(id);

    if (!stock) {
      throw new AppError('Stock not found.', 404);
    }

    await this.stocksRepository.delete(id);
    await this.cacheProvider.invalidatePrefix(cacheKey);
    await this.cacheProvider.invalidate(`stocks-list`);
    return true;
  }
}

export default DeleteService;
