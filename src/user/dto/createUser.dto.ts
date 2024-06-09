/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
   @ApiProperty()
   @Length(4, 30)
   @IsString()
   fullName: string;

   @ApiProperty()
   @Length(11, 50)
   @IsEmail()
   email: string;

   @ApiProperty()
   @IsStrongPassword()
   password: string;
}