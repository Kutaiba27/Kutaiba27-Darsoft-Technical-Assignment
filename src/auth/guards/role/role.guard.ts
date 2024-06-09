/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/auth/types/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflect: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles:Role[] = this.reflect.get('roles', context.getHandler())
    const req = context.switchToHttp().getRequest()
    if(!roles?.includes(req.user.role)){
      throw new ForbiddenException("access denied")
    }
    return true;
  }
}
