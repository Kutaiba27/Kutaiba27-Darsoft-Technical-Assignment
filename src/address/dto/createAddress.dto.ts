/* eslint-disable prettier/prettier */

import { IsString, Length } from "class-validator";

export class CreateAddressDto {

   @IsString()
   @Length(3,40)
   name:string

   @IsString()
   @Length(3,40)
   city: string;

   @IsString()
   @Length(3,40)
   street: string;
   
   @IsString()
   @Length(3,200)
   location_details: string
}