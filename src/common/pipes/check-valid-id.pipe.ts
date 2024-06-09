/* eslint-disable prettier/prettier */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isObjectIdOrHexString } from 'mongoose';

@Injectable()
export class CheckMongoIdPipe implements PipeTransform {
   async transform(value: any, metadata: ArgumentMetadata) {
      if(metadata.type ==  "param"){
         if(!isObjectIdOrHexString(value)){
            throw new BadRequestException('Invalid Id')     
         }
      }
   return value
   }
}