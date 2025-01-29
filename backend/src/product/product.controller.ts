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
import { S3Service } from '../common/aws/s3.service'; // Import S3Service

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly s3Service: S3Service, // Inject S3Service
  ) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('file')) // Handle file uploads
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let fileUrl = null;

    // If a file is uploaded, upload it to S3
    if (file) {
      fileUrl = await this.s3Service.uploadFile(file);
      createProductDto['imageUrl'] = fileUrl; // Add the file URL to the DTO
    }

    return this.productService.createProduct(createProductDto);
  }

  @Get('organization/:organizationId') // Clearer path for organization products
  async getProducts(@Param('organizationId') orgId: string) {
    return this.productService.getProductsByOrganization(orgId);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Patch(':id/status')
  async updateProductStatus(
    @Param('id') id: string,
    @Body() updateProductStatusDto: UpdateProductStatusDto,
  ) {
    return this.productService.updateProductStatus(id, updateProductStatusDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
