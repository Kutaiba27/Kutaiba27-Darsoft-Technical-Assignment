/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/types/role.enum';
import { Gender } from 'src/auth/types/userGender.enum';
import { AddressDocument } from './address.schema';



@Schema({timestamps: true})
export class User {
   @Prop(String)
   fullName: string;

   @Prop({
      type: String,
      unique: true,
      max: 60,
      min: 12
   })
   email: string;

   @Prop({
      type: String,
      min: 8,
      max: 56
   }) 
   password: string;

   @Prop({
      type: String,
      enum: Role,
      default: Role.USER
   })
   role:string

   @Prop({
      type: String
   })
   country:string

   @Prop({
      type: String,
      enum: Gender,
   })
   gender:string

   @Prop({
      type: Date,
   })
   birthday: Date

   @Prop({
      type: String,
   })
   phone: string

   @Prop({
      type: [{ 
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Address'
      }],
         default:[]
   })
   address: AddressDocument[]
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);