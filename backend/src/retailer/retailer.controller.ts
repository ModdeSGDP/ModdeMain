import { Controller, Get, Query, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RetailerService } from './retailer.service';
import { CreateRetailerDto } from './dtos/create-retailer.dto';
import { UpdateRetailerDto } from './dtos/update-retailer.dto';
import { SignupRetailerDto } from './dtos/signup-retailer.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/constants/roles';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Retailers') // Grouping under "Retailers"
@Controller('retailers')
@Roles(ROLES.ADMIN, ROLES.PO)
export class RetailerController {
  constructor(private readonly retailerService: RetailerService) {}

  
  @Post('register')
  @ApiOperation({ summary: 'Register a new retailer' })
  @ApiResponse({ status: 201, description: 'Retailer successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createRetailerDto: CreateRetailerDto) {
    return this.retailerService.create(createRetailerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get a list of retailers with pagination' })
  @ApiResponse({ status: 200, description: 'List of retailers retrieved successfully' })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.retailerService.findAll(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific retailer' })
  @ApiResponse({ status: 200, description: 'Retailer details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Retailer not found' })
  findOne(@Param('id') id: string) {
    return this.retailerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a retailer' })
  @ApiResponse({ status: 200, description: 'Retailer updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Retailer not found' })
  update(
    @Param('id') id: string,
    @Body() updateRetailerDto: UpdateRetailerDto,
  ) {
    return this.retailerService.update(id, updateRetailerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('test')
  test(): string {
    return 'Hello World!';
  }

  @Post('signup')
  @ApiOperation({ summary: 'Register a retailer and admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        retailer: { $ref: '#/components/schemas/CreateRetailerDto' },
        admin: { $ref: '#/components/schemas/CreateAdminDto' },
      },
    },
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Retailer and admin created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createRetailer(@Body() signupRetailerDto: SignupRetailerDto) {
    return this.retailerService.createRetailerWithAdmin(signupRetailerDto);
  }
  
}
