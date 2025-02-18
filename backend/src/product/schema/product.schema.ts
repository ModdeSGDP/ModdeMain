import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { int } from 'aws-sdk/clients/datapipeline';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  image?: string; // field for storing the image URL

  @Prop({type: Types.ObjectId, ref: 'Retailer', required:true })
  retailerId: Types.ObjectId;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
