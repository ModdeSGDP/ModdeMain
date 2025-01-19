import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Retailer, RetailerSchema } from './schemas/retailer.schema';
import { RetailerService } from './retailer.service';
import { RetailerController } from './retailer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Retailer.name, schema: RetailerSchema }]),
  ],
  controllers: [RetailerController],
  providers: [RetailerService],
  exports: [RetailerService],
})
export class RetailerModule {}
