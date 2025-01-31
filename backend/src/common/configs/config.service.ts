import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string | undefined };

  constructor() {
    this.envConfig = process.env; // Store environment variables
  }

  get(key: string): string | undefined {
    return this.envConfig[key]; // Allow dynamic access
  }

  get awsAccessKeyId(): string {
    return this.envConfig.AWS_ACCESS_KEY_ID || '';
  }

  get awsSecretAccessKey(): string {
    return this.envConfig.AWS_SECRET_ACCESS_KEY || '';
  }

  get awsRegion(): string {
    return this.envConfig.AWS_REGION || '';
  }

  get awsBucketName(): string {
    return this.envConfig.AWS_BUCKET_NAME || '';
  }

   // email-related environment variables
   get emailUser(): string {
    return process.env.EMAIL_USER;
  }

  get emailPass(): string {
    return process.env.EMAIL_PASS;
  }

  get adminEmail(): string {
    return process.env.ADMIN_EMAIL;
  }
}
