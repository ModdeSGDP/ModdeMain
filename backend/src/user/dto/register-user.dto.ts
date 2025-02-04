import { IsString, IsNotEmpty, MinLength, IsEnum, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from "class-transformer";
import { ROLES } from 'src/common/constants/roles';
import{ Types } from 'mongoose';

export class RegisterUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(ROLES, {message: `Role must be one of these: ${Object.values(ROLES).join(', ')}`})
  role: ROLES;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsMongoId()
  @IsOptional()
  retailerId: Types.ObjectId;

}

 
