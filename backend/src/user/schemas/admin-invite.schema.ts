import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class AdminInvite {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  token: string;

  @Prop({ default: false })
  accepted: boolean;
}

export type UserDocument= HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);