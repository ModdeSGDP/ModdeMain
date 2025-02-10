import { IsOptional, IsEnum, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'])
  status?: string;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}
