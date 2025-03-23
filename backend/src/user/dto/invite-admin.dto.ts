import { IsEmail, IsNotEmpty } from 'class-validator';

//DTO for inviting an admin using SMTP
export class InviteAdminDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
