import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { UpdateProductDto } from './dtos/update-product.dto';
import {CreateProductDto} from './dtos/create-product.dto'

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async getProductsByOrganization(orgId: string): Promise<Product[]> {
    return this.productModel.find({ organizationId: orgId }).exec();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
