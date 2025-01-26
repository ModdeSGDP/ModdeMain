import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { AwsService } from '../common/aws/aws.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly awsService: AwsService, // AWS Service for S3 integration
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
