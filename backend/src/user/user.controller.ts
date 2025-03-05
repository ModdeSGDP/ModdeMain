import { Controller, Body, Param, Post,  Put, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { InviteAdminDto } from './dto/invite-admin.dto';
import { EmailService } from 'src/common/email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService 
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('invite-admin')
  @ApiOperation({ summary: 'Invite an admin' })
  @ApiResponse({ status: 201, description: 'Admin invited successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async inviteAdmin(@Body() inviteAdminDto: InviteAdminDto) {
    return this.userService.inviteAdmin(inviteAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('update/:id')
  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user ID format' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.userService.updateUser(id, updateUserDto);
  }

  // Find user by email
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('email/:email')
  @ApiOperation({ summary: 'Find a user by email' })
  @ApiParam({ name: 'email', required: true, description: 'User email' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 400, description: 'User not found' })
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findUserByUsername(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  // Verify password
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('verify-password')
  @ApiOperation({ summary: 'Verify user password' })
  @ApiResponse({ status: 200, description: 'Password is correct' })
  @ApiResponse({ status: 400, description: 'Invalid email or password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'securepassword123' }
      },
    },
  })
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
