import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ROLES } from 'src/common/constants/roles';

@Schema({timestamps:true})
export class User  {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: ROLES.ADMIN, enum:[ROLES.ADMIN,ROLES.PO,ROLES.RETAILER] }) // roles: 'user', 'admin'
  role: string;

  @Prop({ required: true, trim:true })
  firstName: string;

  @Prop({ reuired: true, trim: true })
  lastName: string;

  @Prop()
  address: string;

  @Prop({type: Types.ObjectId, ref: 'Retailer', required:true })
    retailerId: Types.ObjectId

  
}
export type UserDocument= HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

