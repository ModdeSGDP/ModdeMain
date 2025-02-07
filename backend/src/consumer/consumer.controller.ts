import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    const token = await this.consumerService.loginConsumer(email, password);
    if (!token) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return { token };
  }
}
