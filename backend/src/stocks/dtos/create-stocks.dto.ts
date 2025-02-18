import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateStocksDto {
    @IsMongoId()
    productId: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    size: string;

    @IsNumber()
    @IsNotEmpty()
    regularPrice: Number;

    @IsNumber()
    @IsNotEmpty()
    salePrice: Number;

    @IsNumber()
    @IsNotEmpty()
    quantity: Number;

}