/* eslint-disable prettier/prettier */
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { CheckEmailUedPipe } from 'src/common/pipes/check-email-used.pipe';
import { logInDto } from './dto/logIn.dto';
import { CheckLogInPipe } from 'src/common/pipes/check-log-in.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService
   ){}


   @Post('sing-in')
   async singIn(@Body(ValidationPipe, CheckEmailUedPipe) userInfo: CreateUserDto){
      return this.authService.singIn(userInfo)
   }

   @Post('log-in')
   async logIn(@Body(ValidationPipe, CheckLogInPipe) logInInfo: logInDto){
      return await this.authService.logIn(logInInfo)
   }
}
