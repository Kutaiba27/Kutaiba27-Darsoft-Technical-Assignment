/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role/role.guard';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema }])],
  providers: [UserService, JwtAuthGuard, RoleGuard],
  controllers: [UserController],
  exports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema }]),UserService]
})
export class UserModule {}
