import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import httpContext from 'express-http-context';

const redisPrefix = process.env.REDIS_PREFIX;

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(
    key: string,
    value: any,
    notClientAppId?: boolean,
  ): Promise<void> {
    this.userData = httpContext.get('user');
    await this.client.set(
      notClientAppId
        ? redisPrefix + key
        : `${redisPrefix + key}-${this.userData?.client_application_id}`,
      JSON.stringify(value),
    );
  }
  public async getAllKeys(): Promise<string[]> {
    const keys = await this.client.keys('*');
    return keys;
  }

  public async recover<T>(
    key: string,
    notClientAppId?: boolean,
  ): Promise<T | null> {
    this.userData = httpContext.get('user');
    const data = await this.client.get(
      notClientAppId
        ? redisPrefix + key
        : `${redisPrefix + key}-${this.userData?.client_application_id}`,
    );
    if (!data) {
      return null;
    }
    const parseData = JSON.parse(data) as T;

    return parseData;
  }

  public async invalidate(
    key: string,
    notClientAppId?: boolean,
  ): Promise<void> {
    this.userData = httpContext.get('user');
    this.client.del(
      notClientAppId
        ? redisPrefix + key
        : `${redisPrefix + key}-${this.userData?.client_application_id}`,
    );
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${redisPrefix + prefix}*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    pipeline.exec();
  }
}
