import { Type } from 'class-transformer';
import { ValidateNested, IsObject } from 'class-validator';
import { CreateRetailerDto } from './create-retailer.dto';
import { RegisterUserDto } from '../../user/dto/register-user.dto';

//This DTO is used to create a new retailer and its admin user at the same time using sign up form
export class SignupRetailerDto {
  @ValidateNested()
  @Type(() => CreateRetailerDto)
  @IsObject()
  retailer: CreateRetailerDto;

  @ValidateNested()
  @Type(() => RegisterUserDto)
  @IsObject()
  admin: RegisterUserDto;
}
