import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateProductStatusDto } from './dtos/update-product-status.dto';
import { AwsService } from '../common/aws/aws.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly awsService: AwsService, // AWS Service for S3 integration
    @InjectQueue('emailQueue') private readonly emailQueue: Queue, // Email queue for notifications
  ) {}

  async createProduct(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<Product> {
    let imageUrl = null;

    if (file) {
      const bucketName = process.env.AWS_S3_BUCKET_NAME;
      const fileKey = `products/${Date.now()}-${file.originalname}`;
      imageUrl = await this.awsService.uploadFile(bucketName, fileKey, file.buffer, file.mimetype);
    }

    const newProduct = new this.productModel({
      ...createProductDto,
      image: imageUrl,
    });

    const savedProduct = await newProduct.save();

    // Queue an email notification
    await this.emailQueue.add('sendEmail', {
      to: 'admin@example.com',
      subject: 'New Product Added',
      body: `A new product, ${savedProduct.name}, has been added.`,
    });

    return savedProduct;
  }

  async getProductsByRetailer(retailerId: string): Promise<Product[]> {
    return this.productModel.find({ retailerId }).exec();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async updateProductStatus(id: string, updateStatusDto: UpdateProductStatusDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { isListed: updateStatusDto.isListed },
      { new: true },
    );

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
