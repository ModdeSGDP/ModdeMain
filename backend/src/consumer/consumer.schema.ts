import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Consumer extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // This should be a hashed password
}

export const ConsumerSchema = SchemaFactory.createForClass(Consumer);

