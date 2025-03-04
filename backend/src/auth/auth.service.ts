import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const payload = {userId: user._id, email: user.email, role: user.role, retailerId: user.retailerId };   //Added retailerId to payload
      return { accessToken: this.jwtService.sign(payload, { expiresIn: '5d' }) };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token); // Decode and validate token
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

//const payload = { username: user.username, sub: user.id, role: user.role };


