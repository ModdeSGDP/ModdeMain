import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/User.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }
}
