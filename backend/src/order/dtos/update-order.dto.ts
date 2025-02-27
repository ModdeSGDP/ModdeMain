import { IsOptional, IsArray, ValidateNested, IsMongoId, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateOrderItemDto {
  @IsMongoId()
  stockId: string;

  @IsNumber()
  quantity: number;
}

export class UpdateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  @IsOptional()
  items?: UpdateOrderItemDto[];

  @IsNumber()
  @IsOptional()
  totalPrice?: number;

  @IsEnum(['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'])
  @IsOptional()
  status?: string;
}
