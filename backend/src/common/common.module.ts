import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { S3Service } from './aws/s3.service';
import { ConfigService } from './configs/config.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'emailQueue', // Register queue for emails
    }),
  ],
  providers: [S3Service, ConfigService],
  exports: [S3Service, ConfigService, BullModule], // Export BullModule
})
export class CommonModule {}


