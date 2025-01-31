import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AwsService } from './aws/aws.service';
import { ConfigService } from './configs/config.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    BullModule.registerQueue({ name: 'emailQueue' }),
  ],
  providers: [AwsService, ConfigService],
  exports: [AwsService, ConfigService, BullModule],
})
export class CommonModule {}