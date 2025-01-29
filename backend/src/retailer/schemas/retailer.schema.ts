import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt`
export class Retailer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  registrationNumber: string;

}

export type RetailerDocument = HydratedDocument<Retailer>;
export const RetailerSchema = SchemaFactory.createForClass(Retailer);
