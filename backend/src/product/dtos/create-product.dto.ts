import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  image?: string; // Optional field for the product image URL

  @IsBoolean()
  @IsOptional()
  isListed?: boolean = true;

  @IsMongoId()
  retailerId: Types.ObjectId;

}
