/* eslint-disable prettier/prettier */
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { logInDto } from 'src/auth/dto/logIn.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CheckLogInPipe implements PipeTransform {
  constructor(private readonly usetService: UserService){}
  async transform(value: logInDto, metadata: ArgumentMetadata) {
    if(metadata.type ===  "body"){
      const user = await this.usetService.findUserByEmail(value.email)
      if(!user){
        throw new HttpException("you are not logged in please sing-in",400)
      }
    }
    return value
  }
}
