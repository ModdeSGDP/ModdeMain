import { Controller, Post, Body, Inject, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(username, password);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.validateUser(username, password);
  }


}
