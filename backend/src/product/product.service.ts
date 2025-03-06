import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { FilterProductDto } from "./dtos/filter-product.dto";
import { ConfigService } from '../common/configs/config.service';
import { S3Service } from '../common/aws/s3.service';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProductService {
  
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly configService: ConfigService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
    private readonly s3Service: S3Service, // Using isolated AWS functionality
  ) {
    // Although S3 functionality is now handled by AwsService, we still initialize s3 here if needed.
    // Alternatively, we can remove these lines if we want to solely rely on s3Service.uploadFile().
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  // Use AwsService's uploadFile() for file uploads
  private async uploadToS3(file: Express.Multer.File): Promise<string> {
    return this.s3Service.uploadFile(file);
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

  
    return savedProduct;
  }

  async getProductById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async getProductsByRetailer(retailerId: string, page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.productModel.find({ retailerId }).skip(skip).limit(limit).exec();
  }

  async getAllProducts(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).exec(),
      this.productModel.countDocuments().exec(),
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }

  async filterProducts(filterDto: FilterProductDto) {
    const { category, size } = filterDto;

    const filterConditions: any = {};
    
    if (category) {
      filterConditions.category = category;
    }
    
    if (size) {
      filterConditions.sizes = size; // Check if size exists in the sizes array
    }

    return this.productModel.find(filterConditions);
  }
}

