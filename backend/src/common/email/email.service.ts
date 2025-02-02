import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService { 
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get("SMTP_HOST"), // SMTP Host
      port: this.configService.get("SMTP_PORT"), // SMTP Port
      secure: this.configService.get("SMTP_SECURE"), // Set true for SSL
      auth: {
        user: this.configService.get("SMTP_USER"), // SMTP Username
        pass: this.configService.get("SMTP_PASSWORD"), // SMTP Password
      },
    });
  }


  async sendEmail( 
    to: string,
    subject: string,
    text?: string,
    html?: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get("SENDER_EMAIL"),
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
