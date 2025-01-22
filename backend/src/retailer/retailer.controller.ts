import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetailerService } from './retailer.service';
import { CreateRetailerDto } from './dtos/create-retailer.dto';
import { UpdateRetailerDto } from './dtos/update-retailer.dto';

@Controller('retailers')
export class RetailerController {
  constructor(private readonly retailerService: RetailerService) {}

  @Post()
  create(@Body() createRetailerDto: CreateRetailerDto) {
    return this.retailerService.create(createRetailerDto);
  }

  @Get()
  findAll() {
    return this.retailerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retailerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRetailerDto: UpdateRetailerDto,
  ) {
    return this.retailerService.update(id, updateRetailerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.retailerService.delete(id);
  }
}
