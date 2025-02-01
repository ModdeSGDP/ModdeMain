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

  @Post('invite-admin')
  async inviteAdmin(@Body() InviteAdminDto: InviteAdminDto){
    return this.userService.inviteAdmin(InviteAdminDto);
  }

}



