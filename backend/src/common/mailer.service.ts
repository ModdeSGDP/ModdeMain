import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../common/configs/config.service';

@Injectable()
export class MailerService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'), 
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: this.configService.get('EMAIL_USER'),
      to,
      subject,
      text,
    });
  }
}
