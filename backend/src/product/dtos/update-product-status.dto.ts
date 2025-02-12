
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateProductStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  isListed: boolean;
}
