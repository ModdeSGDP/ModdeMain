import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Model, Types } from 'mongoose';
import { Queue } from 'bull';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { FilterProductDto } from "./dtos/filter-product.dto";
import { ConfigService } from '../common/configs/config.service';
import { S3Service } from '../common/aws/s3.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { createReadStream, writeFileSync } from 'fs';
import * as FormData from 'form-data';
import { unlinkSync } from 'fs';  // Import unlinkSync to delete files
import { lastValueFrom } from 'rxjs';


@Injectable()
export class ProductService {
  
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly configService: ConfigService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
    private readonly s3Service: S3Service, // Using isolated AWS functionality
    private readonly httpService: HttpService,  // Injecting HttpService
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

  async createProduct(createProductDto: CreateProductDto, file?: Express.Multer.File, user?: any,): Promise<Product> {
    let imageUrl = null;
    let imageId = null;

    if (file) {
      // Step 1: Upload Image to S3
      imageUrl = await this.uploadToS3(file);
      
      console.log('Image uploaded to S3:', imageUrl);

      // Step 2: Save Image Temporarily to Send to FastAPI
      const tempFilePath = `../fastapi/${Date.now()}_${file.originalname}`;
      writeFileSync(tempFilePath, file.buffer);

      // Step 3: Prepare Multipart/Form-Data Request
      const formData = new FormData();
      formData.append('file', createReadStream(tempFilePath), {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      console.log('Sending image to FastAPI for feature extraction...');

      // Step 4: Send Image to FastAPI for Feature Extraction
      try {
        const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        imageId = response.data.image_id;
        console.log('Feature extraction complete. Image ID:', imageId);
      } catch (error) {
        console.error('Error sending image to FastAPI:', error.response?.data || error.message);
        throw new Error('Failed to extract image features');
      } finally {
        // Step 5: Delete the temporary file
        try {
          unlinkSync(tempFilePath);
          console.log('Temporary file deleted:', tempFilePath);
        } catch (err) {
          console.error('Error deleting temporary file:', err);
        }
      }
    }

    const retailerId = new Types.ObjectId(user.retailerId);
    if(!retailerId) {
      throw new Error('Retailer ID is missing from the token');
    }

    const newProduct = new this.productModel({
      ...createProductDto,
      retailerId,
      image: imageUrl,
      image_id: imageId,
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
    const { page, limit } = paginationDto;
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

 //Uploaidng to S3 and pinecone and mongoDB though featuree extraction
 async uploadProduct(file: Express.Multer.File, productData: any): Promise<string> {
  try {
    console.log('Uploading image to S3...');

    // Upload to S3
    const s3Response = await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const imageUrl = `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${Date.now()}_${file.originalname}`;
    console.log('Image uploaded to S3. URL:', imageUrl);

    console.log('Calling FastAPI for feature extraction...');

    // Call FastAPI for feature extraction
    const response = await this.httpService
      .post('http://127.0.0.1:8000/upload', file.buffer, {
        headers: {
          'Content-Type': file.mimetype,
          'Content-Length': file.buffer.length.toString(),
        },
      })
      .toPromise();

    const imageId = response.data.image_id;
    console.log('Feature extraction complete. Image ID:', imageId);

    console.log('Preparing product data for MongoDB...');
    const product = new this.productModel({
      ...productData,
      image_id: imageId,
      image_url: imageUrl,
    });
    console.log('Product data:', product);

    console.log('Saving product data to MongoDB...');
    const savedProduct = await product.save();
    console.log('Product saved to MongoDB:', savedProduct);

    return imageId;
  } catch (error) {
    console.error('Error in uploadProduct:', error);
    throw error;
  }
}

  
 //Sending to fastapi though nestJS
 async searchSimilarProducts(file: Express.Multer.File) {
  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);

  try {
    // Call FastAPI service
    const response = await lastValueFrom(
      this.httpService.post('http://localhost:8000/search', formData, {
        headers: formData.getHeaders(),
      }),
    );

    const similarProductIds: string[] = response.data.similar_images;

    if (!similarProductIds.length) {
      return [];
    }

    // Fetch full product details from the database
    const similarProducts = await this.productModel.find({
      image_id: { $in: similarProductIds },
    });

    return similarProducts;
  } catch (error) {
    throw new HttpException(
      `Failed to search similar products: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  

}

