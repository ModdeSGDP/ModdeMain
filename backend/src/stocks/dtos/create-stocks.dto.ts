import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';

export class CreateStocksDto {
    @ApiProperty({ example: '65d2e9b62a52c3c9e6a3f5a0', description: 'Product ID of the relevant product' })
    @IsMongoId()
    productId: Types.ObjectId;

    @ApiProperty({ example: 'M', description: 'Stock size (S, M, L, XL, etc.)' })
    @IsString()
    @IsNotEmpty()
    size: string;

    @ApiProperty({ example: 50, description: 'Regular price of the product' })
    @IsNumber()
    @IsNotEmpty()
    regularPrice: Number;

    @ApiProperty({ example: 40, description: 'Sale price of the product' })
    @IsNumber()
    @IsNotEmpty()
    salePrice: Number;

    @ApiProperty({ example: 20, description: 'Available quantity in stock' })
    @IsNumber()
    @IsNotEmpty()
    quantity: Number;

}