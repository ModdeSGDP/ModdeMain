import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  customerId: Types.ObjectId;

  @Prop({ type: [{ productId: { type: Types.ObjectId, ref: 'Product' }, quantity: Number }], required: true })
  items: { productId: Types.ObjectId; quantity: number }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'], default: 'Pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
