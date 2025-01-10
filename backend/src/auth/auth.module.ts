import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'MODDE_SECRET_KEY', // Use an environment variable for production
      signOptions: { expiresIn: '1h' }, // Token expiry
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
