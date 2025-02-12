import { Controller, Post, Body, Inject, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailService } from 'src/common/email/email.service';
import { InviteAdminDto } from './dto/invite-admin.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/constants/roles';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService 
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    // The DTO is automatically validated here
    return this.userService.createUser(registerUserDto);
  }

  @Post('invite-admin')
  async inviteAdmin(@Body() InviteAdminDto: InviteAdminDto){
    return this.userService.inviteAdmin(InviteAdminDto);
  }

}



