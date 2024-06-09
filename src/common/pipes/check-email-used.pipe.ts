/* eslint-disable prettier/prettier */
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CheckEmailUedPipe implements PipeTransform {
  constructor(
    private readonly userService: UserService,
  ){}
  async transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if(metadata.type === "body"){
      const user = await this.userService.findUserByEmail(value.email)
      if(user){
        throw new HttpException('this email already exists please log in', 400)
      }
    }
    return value;
  }
}
