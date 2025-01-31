import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { AwsService } from '../common/aws/aws.service';
import { ConfigService } from '../common/configs/config.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly awsService: AwsService,
    private readonly configService: ConfigService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  async createProduct(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<Product> {
    let imageUrl = null;

    if (file) {
      const fileKey = `products/${Date.now()}-${file.originalname}`;
      imageUrl = await this.awsService.uploadFile(fileKey, file.buffer, file.mimetype);
    }

    const newProduct = new this.productModel({
      ...createProductDto,
      image: imageUrl,
    });
    const savedProduct = await newProduct.save();

    await this.emailQueue.add('sendEmail', {
      to: this.configService.get('ADMIN_EMAIL'),
      subject: `New Product Added: ${savedProduct.name}`,
      message: `A new product "${savedProduct.name}" has been added.`,
    });

    return savedProduct;
  }

  async getProductsByRetailer(retailerId: string): Promise<Product[]> {
    return this.productModel.find({ retailerId }).exec();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async updateProductStatus(id: string, updateProduct: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { isListed: updateProduct.isListed },
      { new: true },
    );
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}