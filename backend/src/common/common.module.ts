
import { Module } from '@nestjs/common';
import { S3Service } from './aws/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [S3Service, ConfigService],
  exports: [S3Service, ConfigService], // Export so other modules can use them
})
export class CommonModule {}
