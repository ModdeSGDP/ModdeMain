import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EMAIL_DEFAULTS } from './email.constants';

@Injectable()
export class EmailService { 
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL_DEFAULTS.SMTP_HOST, // SMTP Host (e.g., Gmail)
      port: EMAIL_DEFAULTS.SMTP_PORT, // Port for STARTTLS
      secure: EMAIL_DEFAULTS.SMTP_SECURE, // Set to true for SSL
      auth: {
        user: EMAIL_DEFAULTS.SMTP_USER, // Replace with your email
        pass: EMAIL_DEFAULTS.SMTP_PASS, // Replace with your email password
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
