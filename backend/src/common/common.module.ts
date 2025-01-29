import { Module } from '@nestjs/common';
import { ConfigService } from './configs/config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CommonModule {}
