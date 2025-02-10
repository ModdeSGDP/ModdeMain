import { IsNotEmpty, IsMongoId, IsNumber, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
