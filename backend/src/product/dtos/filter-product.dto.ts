import { IsOptional, IsString } from "class-validator";

export class FilterProductDto {
  @IsOptional()
  @IsString()
  category?: string; // Example: "Women", "Men"

  @IsOptional()
  @IsString()
  size?: string; // Example: "M", "L"
}
