import { Controller, Body, Param, Post,  Put, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { InviteAdminDto } from './dto/invite-admin.dto';
import { EmailService } from 'src/common/email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService 
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  @Post('invite-admin')
  async inviteAdmin(@Body() inviteAdminDto: InviteAdminDto) {
    return this.userService.inviteAdmin(inviteAdminDto);
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.userService.updateUser(id, updateUserDto);
  }

  // Find user by email
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findUserByUsername(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  // Verify password
  @Post('verify-password')
  async verifyPassword(@Body() body: { email: string; password: string }) {
    const user = await this.userService.findUserByUsername(body.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await this.userService.verifyPassword(body.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    return { message: 'Password is correct' };
  }
}
