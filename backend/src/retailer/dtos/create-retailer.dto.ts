
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRetailerDto {
  @ApiProperty({
    description: 'Retailer name',
    example: 'ABC Retailers',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Retailer email address',
    example: 'contact@abc.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Retailer contact number',
    example: '+1234567890',
  })
  @IsString()
  @IsOptional()
  contactNumber?: string;

  @ApiPropertyOptional({
    description: 'Retailer address',
    example: '123 Main Street, City',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Retailer registration number',
    example: 'REG-12345',
  })
  @IsString()
  registrationNumber: string;
}
