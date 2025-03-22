import { IsNotEmpty, IsArray, ValidateNested, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsMongoId()
  stockId: string;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  // @IsMongoId()
  // @IsNotEmpty()
  // customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
