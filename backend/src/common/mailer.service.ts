import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../common/configs/config.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: NestMailerService,
  ) {}

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text,
        // If needed, can also include HTML content:\n  // html: '<b>Your HTML content here</b>',\n });
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Failed to send email');
    }
  }
}
