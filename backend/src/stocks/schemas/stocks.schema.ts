import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

class StockItem {
    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    quantity: number;
}

@Schema({timestamps: true})
export class Stocks {
    @Prop({type: Types.ObjectId, ref: 'Product', required: true})
    productId: Types.ObjectId;

    @Prop({ required: true })
    regularPrice: number;

    @Prop({ required: true })
    salePrice: number;

    @Prop({ type:[StockItem], required: true })
    stock: StockItem[];
}
export type StocksDocument = HydratedDocument<Stocks>;
export const StocksSchema = SchemaFactory.createForClass(Stocks);