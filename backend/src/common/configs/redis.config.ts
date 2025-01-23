import { BullModuleOptions, SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const asyncBullConfig: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<BullModuleOptions> => ({
    redis: {
      host: configService.get<string>('CORE_REDIS_HOST'),
      port: configService.get<number>('CORE_REDIS_PORT'),
      password: configService.get<string>('CORE_REDIS_PASSWORD'),
    },
  }),
  inject: [ConfigService],
};