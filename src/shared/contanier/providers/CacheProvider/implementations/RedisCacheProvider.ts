import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

const redisPrefix = process.env.REDIS_PREFIX;

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(redisPrefix + key, JSON.stringify(value));
  }
  public async getAllKeys(): Promise<string[]> {
    const keys = await this.client.keys('*');
    return keys;
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(redisPrefix + key);
    if (!data) {
      return null;
    }
    const parseData = JSON.parse(data) as T;

    return parseData;
  }

  public async invalidate(key: string): Promise<void> {
    this.client.del(redisPrefix + key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${redisPrefix + prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    pipeline.exec();
  }
}
