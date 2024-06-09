/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UserDocument } from "src/database/schemas/user.schema";
import { UserPayload } from "./types/user-payload";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class TokenService {
   constructor(
      private readonly jwtService: JwtService
   ){}

   async generateToken(user: UserDocument){
      const payload: UserPayload = {
         id: user._id.toString(),
         email:user.email,
         fullName:user.fullName,
         role: user.role
      } 
      return {  
         token: await this.jwtService.signAsync(payload),
         user: user
      }
   }
}