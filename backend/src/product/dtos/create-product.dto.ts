import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsMongoId, Matches } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @Matches('^[A-Za-z\\s]+$')
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

}
