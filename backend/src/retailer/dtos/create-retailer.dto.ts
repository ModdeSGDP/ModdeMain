
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateRetailerDto {
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
