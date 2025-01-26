import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, ref: 'Retailer' })
  organizationId: string;

  @Prop()
  image?: string; // Optional field for storing the image URL
}

export const ProductSchema = SchemaFactory.createForClass(Product);
