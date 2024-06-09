/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from 'src/database/schemas/address.schema';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/database/schemas/user.schema';

@Injectable()
export class AddressService {
   constructor(
      @InjectModel(Address.name) private readonly AddressModel: Model<Address>,
      private readonly userService: UserService
   ){}

   async createAddress(addressInfo: CreateAddressDto, id:string){
      const user:UserDocument = await this.userService.getUserProfile(id)
      const address = {...addressInfo,user: user}
      const newAddress = await this.AddressModel.create(address)
      user.address.push(newAddress)
      await user.save()
      return newAddress
   }

   async getUserAddress(id:string){
      return this.userService.getUserAddress(id)
   }

   async deleteAddress(id:string, idAddress:string){
      const user = await this.userService.getUserAddress(id)
      const address = await this.AddressModel.findById( idAddress)
      if(!address){
         throw new NotFoundException('address not found')
      }
      user.address = user.address.filter(add => add._id.toString() != idAddress)
      await this.AddressModel.findByIdAndDelete(idAddress)
      await user.save();
      return user.address
   }

}
