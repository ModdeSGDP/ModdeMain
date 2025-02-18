import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({timestamps: true})
export class stocks {
    @Prop({type: Types.ObjectId, ref: 'Product', required: true})
    productId: Types.ObjectId;

    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    regularPrice: number;

    @Prop({ required: true })
    salePrice: number;

    @Prop({required: true})
    quantity: number;

}
export type stocksDocument = HydratedDocument<stocks>;
export const stocksSchema = SchemaFactory.createForClass(stocks);