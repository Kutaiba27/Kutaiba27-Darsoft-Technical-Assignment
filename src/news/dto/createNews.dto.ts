/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";
export class CreateNewsDto {

   @IsString()
   title: string;

   @IsString()
   description: string
}