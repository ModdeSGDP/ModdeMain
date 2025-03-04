import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStocksDto } from './dtos/create-stocks.dto';
import { UpdateStocksDto } from './dtos/update-stocks.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Stocks') // Grouping under "Stocks"
@Controller('stocks')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post('add')
  @ApiOperation({ summary: 'Create a new stock entry' })
  @ApiResponse({ status: 201, description: 'Stock created successfully' })
  async create(@Body() createStocksDto: CreateStocksDto) {
    return this.stocksService.create(createStocksDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stocks with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.stocksService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stock by ID' })
  @ApiParam({ name: 'id', required: true, example: '65d3f8b62a52c3c9e6a3f5a1' })
  async findOne(@Param('id') id: string) {
    return this.stocksService.findOne(id);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get stock by product ID' })
  @ApiParam({ name: 'productId', required: true, example: '65d2e9b62a52c3c9e6a3f5a0' })
  async findByProduct(@Param('productId') productId: string) {
    return this.stocksService.findByProduct(productId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update stock by ID' })
  @ApiParam({ name: 'id', required: true, example: '65d3f8b62a52c3c9e6a3f5a1' })
  async update(@Param('id') id: string, @Body() updateStocksDto: UpdateStocksDto) {
    return this.stocksService.update(id, updateStocksDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete stock by ID' })
  @ApiParam({ name: 'id', required: true, example: '65d3f8b62a52c3c9e6a3f5a1' })
  async remove(@Param('id') id: string) {
    return this.stocksService.remove(id);
  }
}
