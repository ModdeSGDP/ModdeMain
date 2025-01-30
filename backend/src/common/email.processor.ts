import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '../common/mailer.service';

@Processor('emailQueue') // Attach processor to the "emailQueue"
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('sendEmail')
  async handleSendEmail(job: Job<{ to: string; subject: string; message: string }>) {
    console.log(`Processing email job: ${job.id}`);

    const { to, subject, message } = job.data;
    
    try {
      // Send email using MailerService
      await this.mailerService.sendMail(to, subject, message);
      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
      throw error; // Let Bull handle retries
    }
  }
}

//How This Works Now:
//  ProductService adds emails to the queue
//  EmailProcessor picks up jobs & calls MailerService
//  MailerService sends real emails using Nodemailer
//  Errors are logged, and Bull can retry failed emails