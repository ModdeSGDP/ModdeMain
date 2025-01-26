import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { RedisService } from 'src/common/reddis/redds.service;
 // Import RedisService

@Injectable()
export class ProductService {
  private readonly cacheTTL = 3600; // Cache Time-to-Live (in seconds)

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly redisService: RedisService, // Inject RedisService
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    const savedProduct = await newProduct.save();

    // Cache the new product by ID
    await this.redisService.set(`product:${savedProduct._id}`, savedProduct, this.cacheTTL);

    return savedProduct;
  }

  async getProductsByOrganization(orgId: string): Promise<Product[]> {
    // Check cache for products by organization
    const cachedProducts = await this.redisService.get(`org:${orgId}:products`);
    if (cachedProducts) return cachedProducts;

    // Fetch from database if not cached
    const products = await this.productModel.find({ organizationId: orgId }).exec();

    // Cache the products for this organization
    await this.redisService.set(`org:${orgId}:products`, products, this.cacheTTL);

    return products;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });

    if (updatedProduct) {
      // Update the cache for the specific product
      await this.redisService.set(`product:${id}`, updatedProduct, this.cacheTTL);
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);

    if (deletedProduct) {
      // Remove the product from the cache
      await this.redisService.del(`product:${id}`);
    }

    return deletedProduct;
  }

  async getProductById(id: string): Promise<Product> {
    // Check cache for product by ID
    const cachedProduct = await this.redisService.get(`product:${id}`);
    if (cachedProduct) return cachedProduct;

    // Fetch from database if not cached
    const product = await this.productModel.findById(id).exec();

    if (product) {
      // Cache the product
      await this.redisService.set(`product:${id}`, product, this.cacheTTL);
    }

    return product;
  }
}
