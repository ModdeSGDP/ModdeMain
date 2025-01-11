import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Use environment variables for production
      signOptions: { expiresIn: '1h' }, // Token expiry
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

