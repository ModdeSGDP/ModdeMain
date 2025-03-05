import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RetailerGuard } from './guards/retailer.guard';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported
    PassportModule,
    forwardRef(() => UserModule), // Handle circular dependencies if any
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to use env variables
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default_secret'),
        signOptions: { expiresIn: '1h' }, // Set expiration for tokens
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RetailerGuard],
  exports: [AuthService, JwtModule, RetailerGuard],
})
export class AuthModule {}
