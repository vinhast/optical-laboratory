import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<string[]> {
    const keys = await this.cacheProvider.getAllKeys();
    const keysSorted = keys.sort((currentKey: string, nextKey: string) =>
      currentKey.localeCompare(nextKey),
    );
    return keysSorted;
  }
}

export default ListService;
