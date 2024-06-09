/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { genSaltSync, hashSync } from 'bcryptjs'
import { UpdateUserDto } from './dto/updateInfo.dto';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private readonly userModel: Model<User> 
   ){}

   async createUser(userInfo: CreateUserDto): Promise<UserDocument>{
      const sult =  genSaltSync(10)
      const hashPassword = hashSync(userInfo.password, sult)
      userInfo.password = hashPassword
      const user = await this.userModel.create(userInfo)
      if(!user){
         throw new HttpException('Error on create user please try again', 500);
      }
      return user
   }

   async findUserByEmail(email: string): Promise<UserDocument | null>{
      const user = await this.userModel.findOne({email: email})
      if(!user){
         return null;
      }
      return user
   }

   async updateUserProfile(updateUserInfo: UpdateUserDto, userid: string){
      const user = await this.userModel.updateOne(
         {id: userid},
         {...updateUserInfo},
         {}
      )
      if(!user){
         throw new HttpException("update failed",500)
      }
      return {
         resulte: "success",
      }
   }

   async getUserProfile(id: string){
      return await this.userModel.findById(id).select('-password -__v -createdAt -updatedAt -address')
   }

   async getUserAddress(id:string){
      
      return await this.userModel.findById(id).select('address').populate('address')
   }



}
