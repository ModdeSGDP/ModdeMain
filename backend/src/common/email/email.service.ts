import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService { 
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL_DEFAULTS.get("SMTP_HOST"), // SMTP Host (e.g., Gmail)
      port: EMAIL_DEFAULTS.get("SMTP_PORT"), // Port for STARTTLS
      secure: EMAIL_DEFAULTS.get("SMTP_SECURE"), // Set to true for SSL
      auth: {
        user: EMAIL_DEFAULTS.get("SMTP_USER"), // Replace with your email
        pass: ConfigService.get("SMTP_PASSWORD"), // Replace with your email password
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
      from: EMAIL_DEFAULTS.SENDER_EMAIL,
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
