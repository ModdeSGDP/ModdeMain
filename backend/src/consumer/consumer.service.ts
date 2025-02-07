import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Consumer } from './consumer.schema';

@Injectable()
export class ConsumerService {
  constructor(
    @InjectModel(Consumer.name) private consumerModel: Model<Consumer>,
    private readonly jwtService: JwtService,
  ) {}

  async loginConsumer(email: string, password: string): Promise<string | null> {
    const consumer = await this.consumerModel.findOne({ email }).exec();
    if (!consumer) {
      throw new UnauthorizedException('Consumer not found');
    }

    const isMatch = await bcrypt.compare(password, consumer.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: consumer.id, email: consumer.email, role: 'consumer' };
    return this.jwtService.sign(payload);
  }
}
