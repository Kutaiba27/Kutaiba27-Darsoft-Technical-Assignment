/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserId = createParamDecorator(
   (_:undefined, context: ExecutionContext)=>{
      const request = context.switchToHttp().getRequest()
      return request.user.id
   }
)