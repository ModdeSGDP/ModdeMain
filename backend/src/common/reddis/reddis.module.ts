import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost', // Replace with your Redis host
      port: 6379,        // Replace with your Redis port
      ttl: 600,          // Cache expiration time in seconds
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
