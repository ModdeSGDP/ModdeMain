import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ConfigService } from '../common/configs/config.service';

@Injectable()
export class ProductService {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly configService: ConfigService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  private async uploadToS3(file: Express.Multer.File): Promise<string> {
    const fileKey = `products/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    return `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileKey}`;
  }

  async createProduct(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<Product> {
    let imageUrl = null;

    if (file) {
      imageUrl = await this.uploadToS3(file);
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
    return this.productModel.findByIdAndUpdate(id, { isListed: updateProduct.isListed }, { new: true });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
