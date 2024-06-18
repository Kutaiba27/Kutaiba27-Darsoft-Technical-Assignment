<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { GetUserId } from 'src/common/decorators/getCurrentUserId.decorator';
import { UpdateUserDto } from './dto/updateInfo.dto'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CheckMongoIdPipe } from 'src/common/pipes/check-valid-id.pipe';
import { Role as EnumRole } from 'src/auth/types/role.enum';


@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
   constructor(
      private readonly userService: UserService
   ){}
   

   @Put('update-profile')
   @ApiBody({type: UpdateUserDto})
   @Role('user')
   @UseGuards(JwtAuthGuard, RoleGuard)
   @HttpCode(201)
   async updateProfile(@Body() updateInfo: UpdateUserDto, @GetUserId() id: string) {
      return await this.userService.updateUserProfile(updateInfo, id)
   }

   @Get('my-profile')
   @UseGuards(JwtAuthGuard)
   @HttpCode(200)
   async getMyProfile(@GetUserId() id:string){
      return await this.userService.getUserProfile(id)
   }

   @Get('user-profile/:id')
   @ApiParam({name:'id',type: String})
   @HttpCode(200)
   async getUserProfile(@Param('id', CheckMongoIdPipe) id:string){
      return await this.userService.getUserProfile(id)
   }

   @Put('update-user-role/:id-user')
   @ApiBody({ enum: ['admin', 'user']})
   @Role('admin')
   @UseGuards(JwtAuthGuard, RoleGuard)
   async updateUserRole(@Param('id-user', CheckMongoIdPipe) userId:string, @Body() role: EnumRole ){
      return await this.userService.updateUserRole(userId,role)
   }

}
=======
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}
>>>>>>> d432704 (initail commit)
