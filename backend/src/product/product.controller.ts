import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { FilterProductDto } from "./dtos/filter-product.dto";
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '../common/configs/config.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RetailerGuard } from 'src/auth/guards/retailer.guard';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('product')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly configService: ConfigService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('file', file);
    const product = await this.productService.createProduct(createProductDto, file, req.user);
    // Optionally, we could add an email notification here, but it's already queued in the service
    return product;
  }

  @Get()
  async getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productService.getAllProducts(paginationDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get('retailer/:retailerId/products')
  // @UseGuards(JwtAuthGuard)
  async getProductsByRetailer(
    @Param('retailerId') retailerId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.productService.getProductsByRetailer(retailerId, page, limit);
  }


  @Get("filter")
  async filterProducts(@Query() filterDto: FilterProductDto) {
    return this.productService.filterProducts(filterDto);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);
    // await this.emailQueue.add('sendEmail', {
    //   to: this.configService.get('ADMIN_EMAIL'),
    //   subject: `Product Deleted`,
    //   message: `<h3>Product ID: ${id} has been removed from the system.</h3>`,
    // });
    return deletedProduct;
  }

  @Post('search-similar')
  @UseInterceptors(FileInterceptor('file'))
  async searchSimilarProducts(
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return this.productService.searchSimilarProducts(file);
  }
}
