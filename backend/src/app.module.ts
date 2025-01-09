import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://moddeapp:modde123@moddedb.szqf3.mongodb.net/?retryWrites=true&w=majority&appName=ModdeDB')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
