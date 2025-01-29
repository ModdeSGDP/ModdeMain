import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService {
  get awsAccessKeyId(): string {
    return process.env.AWS_ACCESS_KEY_ID;
  }

  get awsSecretAccessKey(): string {
    return process.env.AWS_SECRET_ACCESS_KEY;
  }

  get awsRegion(): string {
    return process.env.AWS_REGION;
  }

  get awsBucketName(): string {
    return process.env.AWS_BUCKET_NAME;
  }
}
