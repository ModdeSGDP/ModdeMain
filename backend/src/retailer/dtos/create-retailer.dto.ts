
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRetailerDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
