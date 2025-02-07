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
  size: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  regularPrice: number;

  @Prop({ required: true })
  salePrice: number;

  @Prop()
  image?: string; // field for storing the image URL

  @Prop({ default: true }) // Default to "listed"
  isListed: boolean;

  @Prop({type: Types.ObjectId, ref: 'Retailer', required:true })
  retailerId: Types.ObjectId
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
