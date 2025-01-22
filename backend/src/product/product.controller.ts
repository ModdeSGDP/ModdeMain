import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import {CreateProductDto} from './dtos/create-product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':organizationId')
  async getProducts(@Param('organizationId') orgId: string) {
    return this.productService.getProductsByOrganization(orgId);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
