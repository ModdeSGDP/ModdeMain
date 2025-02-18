import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsOptional()
  @IsString()
  image?: string; // Optional field for the product image URL

  @IsMongoId()
  retailerId: Types.ObjectId;

}
