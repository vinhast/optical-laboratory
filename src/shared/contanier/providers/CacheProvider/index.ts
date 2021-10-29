import { container } from 'tsyringe';

import RedisCacheProvider from '@shared/contanier/providers/CacheProvider/implementations/RedisCacheProvider';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
