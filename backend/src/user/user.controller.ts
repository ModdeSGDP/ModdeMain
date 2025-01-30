import { Controller, Post, Body, Inject, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailService } from 'src/common/email/email.service';
import { InviteAdminDto } from './dto/invite-admin.dto';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService 
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    // The DTO is automatically validated here
    return this.userService.createUser(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    // Reuse the same DTO for login if fields match
    const { username, password } = loginUserDto;
    return this.authService.validateUser(username, password);
  }

  @Post('invite-admin')       //Should be done using userService. Not emailService
  async inviteAdmin(@Body() inviteAdminDto: InviteAdminDto) {
    const inviteLink = `https://your-domain.com/admin/accept?email=${inviteAdminDto.email}`;
    await this.emailService.sendAdminInvitation(inviteAdminDto.email, inviteLink);
    return { message: 'Invitation sent successfully!' };
  }

  @Post('test-email')
  async testEmail(): Promise<{ message: string }> {
    await this.emailService.testEmail();
    return { message: 'Test email sent successfully!' };
}


}



