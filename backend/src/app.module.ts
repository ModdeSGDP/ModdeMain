import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { mongooseModuleAsyncOptions } from "./common/configs/mongodb.config"
import { ConfigModule } from "@nestjs/config"
import { EmailModule } from "./common/email/email.module"
import { RetailerModule } from "./retailer/retailer.module"
import { StocksModule } from "./stocks/stocks.module"
import { ProductModule } from "./product/product.module"
import { OrderModule } from "./order/order.module"
import { S3Service } from './common/aws/s3.service';  
import { UploadController } from './common/aws/upload.controller';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      cache: true,
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    UserModule,
    AuthModule,
    EmailModule,
    RetailerModule,
    ProductModule,
    StocksModule,
    OrderModule,
  ],
  controllers: [AppController,UploadController],
  providers: [AppService,S3Service], 
})
export class AppModule {}

