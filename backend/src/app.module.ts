import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { mongooseModuleAsyncOptions } from './common/configs/mongodb.config';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './common/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,envFilePath:".env",cache:true
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    UserModule,
    AuthModule,
    EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
