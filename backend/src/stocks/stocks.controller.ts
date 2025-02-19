import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStocksDto } from './dtos/create-stocks.dto';
import { UpdateStocksDto } from './dtos/update-stocks.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post('add')
  async create(@Body() createStocksDto: CreateStocksDto) {
    return this.stocksService.create(createStocksDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.stocksService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.stocksService.findOne(id);
  }

  @Get('product/:productId')
  async findByProduct(@Param('productId') productId: string) {
    return this.stocksService.findByProduct(productId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStocksDto: UpdateStocksDto) {
    return this.stocksService.update(id, updateStocksDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.stocksService.remove(id);
  }
}
