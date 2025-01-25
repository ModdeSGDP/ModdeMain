import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from "class-transformer";

export class LoginUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
