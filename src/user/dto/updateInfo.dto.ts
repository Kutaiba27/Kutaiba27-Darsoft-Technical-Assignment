/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Gender } from "src/auth/types/userGender.enum";


export class UpdateUserDto {

   @ApiProperty({required: false, type: String})
   @IsString()
   @IsOptional()
   fullName: string;

   @ApiProperty({required: false, type: Date})
   @IsDate()
   @IsOptional()
   birthday: Date;

   @ApiProperty({required: false, type: String})
   @IsString()
   @IsOptional()
   country: string;

   @ApiProperty({required: false, type: String})
   @IsOptional()
   @IsEnum(Gender)
   @IsString()
   gender:string;
   
   @ApiProperty({required: false, type: String})
   @IsPhoneNumber()
   @IsString()
   @IsOptional()
   phone: string;
}