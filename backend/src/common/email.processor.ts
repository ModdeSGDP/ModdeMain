import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('emailQueue') // Attach processor to the "emailQueue"
export class EmailProcessor {
  @Process('sendEmail')
  async handleSendEmail(job: Job<any>) {
    console.log(`Processing email job: ${job.id}`);
    
    const { to, subject, message } = job.data;
    // Here you would call your email service to send the email
    console.log(`Sending email to ${to} with subject: ${subject}`);

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log(`Email sent successfully to ${to}`);
  }
}
