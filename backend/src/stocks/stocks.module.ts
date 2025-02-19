import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stocks, StocksSchema } from './schemas/stocks.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stocks.name, schema: StocksSchema }]),
    ProductModule],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService], // Export if used in other modules
})
export class StocksModule {}

