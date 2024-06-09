/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

@Schema({timestamps: true})
export class Address {
   @Prop({
      type: String
   })
   name: string;

   @Prop({
      type: String
   })
   city: string;

   @Prop({
      type: String
   })
   street:string

   @Prop({
      type: String
   })
   location_details: string

   @Prop({
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   })
   user:User
}

export type AddressDocument = HydratedDocument<Address>;

export const AddressSchema = SchemaFactory.createForClass(Address);
