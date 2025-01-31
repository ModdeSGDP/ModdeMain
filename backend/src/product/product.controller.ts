import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateProductStatusDto } from './dtos/update-product-status.dto';
import { S3Service } from '../common/aws/s3.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '../common/configs/config.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let fileUrl = null;

    // Upload file to AWS S3 if available
    if (file) {
      fileUrl = await this.s3Service.uploadFile(file);
      createProductDto.imageUrl = fileUrl;
    }

    const product = await this.productService.createProduct(createProductDto);

    // Queue email notification for new product
    await this.emailQueue.add('sendEmail', {
      to: this.configService.adminEmail, // Admin email from ConfigService
      subject: 'New Product Added',
      message: `
        <h3>A new product has been added: ${product.name}</h3>
        <p>Check it out in the dashboard.</p>
      `,
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
    const updatedProduct = await this.productService.updateProductStatus(id, updateProductStatusDto);

    //  Queue email notification for status update
    await this.emailQueue.add('sendEmail', {
      to: this.configService.adminEmail,
      subject: `Product Status Updated`,
      message: `
        <h3>Product ID: ${id} status changed to ${updateProductStatusDto.status}</h3>
      `,
    });

    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);

    //  Queue email notification for product deletion
    await this.emailQueue.add('sendEmail', {
      to: this.configService.adminEmail,
      subject: `Product Deleted`,
      message: `
        <h3>Product ID: ${id} has been removed from the system.</h3>
      `,
    });

    return deletedProduct;
  }
}
