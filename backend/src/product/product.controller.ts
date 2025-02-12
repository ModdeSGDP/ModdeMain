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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateProductStatusDto } from './dtos/update-product-status.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '../common/configs/config.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('product')
@UseGuards(JwtAuthGuard)
@Roles('PO', 'RETAILER', 'ADMIN')
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
    // Optionally, we could add an email notification here, but it's already queued in the service
    return product;
  }

  @Get('retailer/:retailerId')
  @UseGuards(JwtAuthGuard)
  async getProductsByRetailer(
    @Param('retailerId') retailerId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productService.getProductsByRetailer(retailerId, Number(page), Number(limit));
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Patch(':id/status')
  async updateProductStatus(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(id, updateProductDto);
    await this.emailQueue.add('sendEmail', {
      to: this.configService.get('ADMIN_EMAIL'),
      subject: `Product Status Updated`,
      message: `<h3>Product ID: ${id} status changed to ${updateProductDto.isListed}</h3>`,
    });
    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);
    await this.emailQueue.add('sendEmail', {
      to: this.configService.get('ADMIN_EMAIL'),
      subject: `Product Deleted`,
      message: `<h3>Product ID: ${id} has been removed from the system.</h3>`,
    });
    return deletedProduct;
  }
}
