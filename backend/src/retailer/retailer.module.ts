import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Retailer, RetailerSchema } from './schemas/retailer.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { RetailerService } from './retailer.service';
import { RetailerController } from './retailer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Retailer.name, schema: RetailerSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RetailerController],
  providers: [RetailerService],
  exports: [RetailerService],
})
export class RetailerModule {}
