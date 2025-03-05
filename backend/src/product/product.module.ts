import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { CommonModule } from '../common/common.module'; 
import { AuthModule } from 'src/auth/auth.module';
import { S3Service } from 'src/common/aws/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    BullModule.registerQueue({ name: 'emailQueue' }), // Register Bull queue for emails
    CommonModule,
    AuthModule, // Import shared services
  ],
  controllers: [ProductController],
  providers: [ProductService, S3Service],
  exports: [ProductService, MongooseModule, S3Service],
})
export class ProductModule {}
