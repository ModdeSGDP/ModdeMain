// import { Controller, Post, Body, Inject, forwardRef } from '@nestjs/common';
// import { UserService } from './user.service';
// import { AuthService } from '../auth/auth.service';

// @Controller('user')
// export class UserController {
//   constructor(
//     private readonly userService: UserService,
//     @Inject(forwardRef(() => AuthService))
//     private readonly authService: AuthService,
//   ) {}

//   @Post('register')
//   async register(
//     @Body('username') username: string,
//     @Body('password') password: string,
//   ) {
//     return this.userService.createUser(username, password);
//   }

//   @Post('login')
//   async login(
//     @Body('username') username: string,
//     @Body('password') password: string,
//   ) {
//     return this.authService.validateUser(username, password);
//   }


// }

import { Controller, Post, Body, Inject, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
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
}


