/* eslint-disable prettier/prettier */
import { TokenService } from './token.service';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from '../user/user.service'
import { UserDocument } from 'src/database/schemas/user.schema';
import { logInDto } from './dto/logIn.dto';
import { compare } from 'bcryptjs'


@Injectable()
export class AuthService {

   constructor(
      private readonly userService: UserService,
      private readonly tokenService: TokenService
   ){}

   async singIn(userInfo: CreateUserDto){
      const user: UserDocument = await this.userService.createUser(userInfo)
      return this.tokenService.generateToken(user)
   }

   async logIn(logInInfo: logInDto){
      const user: UserDocument = await this.userService.findUserByEmail(logInInfo.email)
      if( !await compare(logInInfo.password, user.password)){
         throw new HttpException("email or password mismatch", 400)
      }
      return this.tokenService.generateToken(user)
   }   
}

