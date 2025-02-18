import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { stocks, stocksSchema } from './schemas/stocks.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: stocks.name, schema: stocksSchema }])],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService], // Export if used in other modules
})
export class StocksModule {}

