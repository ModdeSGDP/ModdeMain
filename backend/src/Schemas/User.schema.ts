import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) // Possible roles: 'user', 'admin'
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

