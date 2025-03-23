import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { int } from 'aws-sdk/clients/datapipeline';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  image?: string; // field for storing the image URL from AWS S3

  @Prop({type: Types.ObjectId, ref: 'Retailer', required:true })
  retailerId: Types.ObjectId;

  //Field for storing feature extraction image id generated from Pinecone db
  @Prop({ required: true })
  image_id: string;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
