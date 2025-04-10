import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { asyncBullConfig } from './configs/redis.config';
import { S3Service } from './aws/s3.service';
import { GlobalAccelerator } from 'aws-sdk';
import { ConfigService } from './configs/config.service';



@Global()
@Module({
  imports: [
    BullModule.forRootAsync(asyncBullConfig),
    BullModule.registerQueue({ name: 'emailQueue' }),
  ],
  providers: [S3Service, ConfigService],
  exports: [S3Service, ConfigService ],
})
export class CommonModule {}