import { IsString, IsNotEmpty, MinLength, IsEnum, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from "class-transformer";
import { ROLES } from 'src/common/constants/roles';
import{ Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securepassword', description: 'User password (min 6 characters)' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: ROLES.ADMIN, description: `User role`, enum: ROLES })
  @IsEnum(ROLES, {message: `Role must be one of these: ${Object.values(ROLES).join(', ')}`})
  role: ROLES;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '123 Main St, City, Country', description: 'User address', required: false })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'Male', description: 'User gender', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: '60d5f9e7b3e2a10f4c2a1c7a', description: 'Retailer ID', required: false })
  @IsMongoId()
  @IsOptional()
  retailerId: Types.ObjectId;

}

 
