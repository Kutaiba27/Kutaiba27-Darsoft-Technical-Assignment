/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const Role = (...roles: string[]) => SetMetadata('roles', roles);
