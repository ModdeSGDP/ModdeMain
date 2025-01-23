import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  // Set a key-value pair in Redis
  async set(key: string, value: any, ttl: number = 600): Promise<void> {
    await this.cacheManager.set(key, value, { ttl });
  }

  // Get a value by key
  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  // Delete a key
  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}