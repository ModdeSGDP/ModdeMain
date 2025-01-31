import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '../configs/config.service';

@Injectable()
export class AwsService {
  private readonly s3: S3;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(key: string, file: Buffer, contentType: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
    };
    const result = await this.s3.upload(params).promise();
    return result.Location;
  }
}
