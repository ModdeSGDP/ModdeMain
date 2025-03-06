import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string; 

  private readonly imgMimeToExtension = {
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/webp': 'webp',
  };
  constructor(private readonly configService: ConfigService) {
    // Use ConfigService to retrieve AWS configuration
    this.bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
    this.s3 = new S3Client({
      region: this.configService.get("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}.${this.imgMimeToExtension[file.mimetype]}`; // Generate unique file name
    console.log(this.bucketName);
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      
    };

    await this.s3.send(new PutObjectCommand(params));

    // Return the full public URL of the uploaded file
    console.log(`https://${this.bucketName}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${fileKey}`);
    return `https://${this.bucketName}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${fileKey}`;
  }
}
