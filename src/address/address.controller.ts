/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Get, Param, Delete, UseInterceptors, HttpCode } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { GetUserId } from 'src/common/decorators/getCurrentUserId.decorator';
import { CreateAddressRes } from './types/createAddressRes.type';
import { Address } from 'src/database/schemas/address.schema';
import { WrapResponseInterceptor } from 'src/common/interceptors/wrap-response.interceptor';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CheckMongoIdPipe } from 'src/common/pipes/check-valid-id.pipe';

@ApiTags('address')
@ApiBearerAuth()
@Controller('address')
@UseInterceptors(WrapResponseInterceptor)
export class AddressController {
   constructor(
      private readonly addressService: AddressService
   ){}

   @Post('create-address')
   @Role('user')
   @UseGuards(JwtAuthGuard, RoleGuard)
   @HttpCode(201)
   async createAddress(@Body() addressInfo: CreateAddressDto, @GetUserId() id: string): Promise<CreateAddressRes> {
      const newAddress = await this.addressService.createAddress(addressInfo, id)
      return  {
         name: newAddress.name,
         city: newAddress.city,
         street: newAddress.street,
         location_details: newAddress.location_details,
         id: newAddress.id
      }
   }

   @Get('get-user-address')
   @ApiHeader({
      name: 'Authorization',
      description: 'header for authorization',
   })
   @UseGuards(JwtAuthGuard)
   @HttpCode(200)
   async getUserAddress(@GetUserId() id: string):Promise<Address[]>{
      const userAddress=await this.addressService.getUserAddress(id)
      return userAddress.address
   }

   @Delete('delete-address/:id')
   @ApiHeader({
      name: 'Authorization',
      description: 'header for authorization',
   })
   @Role('user')
   @UseGuards(JwtAuthGuard)
   @HttpCode(204)
   async deleteUserAddress(@GetUserId() userId: string, @Param('id',CheckMongoIdPipe) addressId: string){
      return await this.addressService.deleteAddress(userId, addressId)
   }
}