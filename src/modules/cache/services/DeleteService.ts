import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(key: string): Promise<boolean> {
    const findCacheKey = await this.cacheProvider.recover(key, true);
    if (!findCacheKey) {
      throw new AppError('This key not found', 404);
    }
    await this.cacheProvider.invalidate(key);

    return true;
  }
}

export default DeleteService;
