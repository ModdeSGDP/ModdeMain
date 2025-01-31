import { Controller, Post, Get, Patch, Delete, Param, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateProductStatusDto } from './dtos/update-product-status.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '../common/configs/config.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly configService: ConfigService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const product = await this.productService.createProduct(createProductDto, file);
    await this.emailQueue.add('sendEmail', {
      to: this.configService.get('ADMIN_EMAIL'),
      subject: 'New Product Added',
      message: `<h3>A new product has been added: ${product.name}</h3><p>Check it out in the dashboard.</p>`
    });
    return product;
  }

  @Get('retailer/:retailerId')
  async getProducts(@Param('retailerId') retailerId: string) {
    return this.productService.getProductsByRetailer(retailerId);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Patch(':id/status')
  async updateProductStatus(@Param('id') id: string, @Body() updateProductStatusDto: UpdateProductStatusDto) {
    return this.productService.updateProductStatus(id, updateProductStatusDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}