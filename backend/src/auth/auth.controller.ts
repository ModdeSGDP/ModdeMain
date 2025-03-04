import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Guard for JWT authentication


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard) // Protect this route with the guard
  async getMe(@Req() req) {
    //const userId = getUserIdFromRequest(req); // Extract userId using the utility
    //return { userId, message: 'User ID extracted successfully!' };
  }
}
