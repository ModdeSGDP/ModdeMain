import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
@Processor('emailQueue')
export class Consumer {
  constructor(private readonly emailService: EmailService) {}

  @Process('sendEmail')
  async handleSendEmail(job: Job<{ to: string; subject: string; message: string }>) {
    const { to, subject, message } = job.data;
    try {
      await this.emailService.sendEmail(to, subject, message);
      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  }
}
