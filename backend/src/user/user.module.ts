import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminInviteSchema } from './schemas/admin-invite.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { EmailModule } from 'src/common/email/email.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema },
      { name: 'AdminInvite', schema: AdminInviteSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // 👈 Ensure a secret is provided
      signOptions: { expiresIn: '1h' },
    }),
   
  ],
  providers: [UserService, EmailService],    
  controllers: [UserController],
  exports: [UserService], // Export if used in other modules like AuthModule
})
export class UserModule {}

