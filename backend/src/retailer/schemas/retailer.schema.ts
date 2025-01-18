import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt`
export class Retailer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  registrationNumber: string;

  @Prop({ default: [] }) // List of admins
  admins: string[];
}

export const RetailerSchema = SchemaFactory.createForClass(Retailer);
