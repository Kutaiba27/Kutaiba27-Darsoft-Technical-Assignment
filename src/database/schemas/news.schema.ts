/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class News {
   @Prop({
      type: String
   })
   title: string;

   @Prop({
      type: String
   })
   description: string;

}

export type NewsDocument = HydratedDocument<News>;

export const NewsSchema = SchemaFactory.createForClass(News);
