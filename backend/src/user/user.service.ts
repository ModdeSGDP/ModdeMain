// import { ConflictException, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import { User } from './schemas/user.schema';

// @Injectable()
// export class UserService {
//   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

//   async createUser(username: string, password: string): Promise<User> {
//     const existingUser = await this.userModel.findOne({ username });
//     if (existingUser) {
//       throw new ConflictException('Username already exists');
//     }
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash password
//     const newUser = new this.userModel({ username, password: hashedPassword });
//     return newUser.save();
//   }

//   async findUserByUsername(username: string): Promise<User | null> {
//     return this.userModel.findOne({ username });
//   }

//   async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
//     return bcrypt.compare(password, hashedPassword);
//   }
// }


import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password } = registerUserDto;

    // Check if the username already exists
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new this.userModel({ 
      username, 
      password: hashedPassword 
    });
    return newUser.save();
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

