import { container, inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import cache from '@config/cache';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(key: string): Promise<boolean> {
    const findCacheKey = await this.cacheProvider.recover(key);
    if (!findCacheKey) {
      throw new AppError('This key not found', 404);
    }
    await this.cacheProvider.invalidate(key);

    return true;
  }
}

export default DeleteService;
