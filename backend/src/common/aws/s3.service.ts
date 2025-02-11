import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string; 

  constructor(private readonly configService: ConfigService) {
    // Use ConfigService to retrieve AWS configuration
    this.bucketName = this.configService.get("modde");
    this.s3 = new S3Client({
      region: this.configService.get("us-east-1"),
      credentials: {
        accessKeyId: this.configService.get("AKIAWAA66M7MMESEDSVC"),
        secretAccessKey: this.configService.get("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"),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`; // Generate unique file name
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Make the file publicly accessible
    };

    await this.s3.send(new PutObjectCommand(params));

    // Return the full public URL of the uploaded file
    return `https://${this.bucketName}.s3.${this.configService.get("us-east-1")}.amazonaws.com/${fileKey}`;
  }
}
