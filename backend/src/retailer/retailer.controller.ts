import { Controller, Get, Query, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RetailerService } from './retailer.service';
import { CreateRetailerDto } from './dtos/create-retailer.dto';
import { UpdateRetailerDto } from './dtos/update-retailer.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/constants/roles';

@Controller('retailers')
// @UseGuards(JwtAuthGuard)
// @Roles(ROLES.ADMIN, ROLES.PO)
export class RetailerController {
  constructor(private readonly retailerService: RetailerService) {}

  
  @Post('register')
  create(@Body() createRetailerDto: CreateRetailerDto) {
    return this.retailerService.create(createRetailerDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.retailerService.findAll(paginationDto);
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

  @Get('test')
  test(): string {
    return 'Hello World!';
  }
  
}
