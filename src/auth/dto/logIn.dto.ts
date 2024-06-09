/* eslint-disable prettier/prettier */

import { IsEmail, IsString } from "class-validator";

export class logInDto {

   @IsEmail()
   email: string
   
   @IsString()
   password: string
}