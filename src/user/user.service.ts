/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { genSaltSync, hashSync } from 'bcryptjs'
import { UpdateUserDto } from './dto/updateInfo.dto';
import { Role } from 'src/auth/types/role.enum';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private readonly userModel: Model<User> 
   ){}

   async createUser(userInfo: CreateUserDto): Promise<UserDocument>{
      const sult =  genSaltSync(10)
      const hashPassword = hashSync(userInfo.password, sult)
      userInfo.password = hashPassword
      try{
         const user = await this.userModel.create(userInfo)
         return user
      }catch(error){
         throw new HttpException('Error on create user please try again', 500);
      }
   }

   async findUserByEmail(email: string): Promise<UserDocument | null>{
      try{
         const user = await this.userModel.findOne({email: email})
         if(!user){
            return null;
         }
         return user
      }catch(error){
         throw new HttpException(error.name, 500);
      }
   }

   async updateUserProfile(updateUserInfo: UpdateUserDto, userid: string):Promise<{resulte:string}>{
      const user = await this.userModel.updateOne(
         {id: userid},
         {...updateUserInfo},
      )
      if(!user){
         throw new HttpException("update failed",500)
      }
      return {
         resulte: "update success",
      }
   }

   async getUserProfile(id: string):Promise<UserDocument>{
      try{
         const user = await this.userModel.findById(id).select('-password -__v -createdAt -updatedAt')
         if(!user){
            throw new NotFoundException('user not found')
         }
         return user
      }catch(error){
         throw new HttpException(error.message,500)
      }
   }

   async getUserAddress(id:string){
      try{
         return await this.userModel.findById(id).select('address').populate('address')
      }catch(erro){
         throw new HttpException(erro.name,500) 
      }
   }

   async updateUserRole(userId:string, role: Role){
      try{ 
         await this.userModel.findByIdAndUpdate(userId,{role})
         return {
            result: "updated role successfully",
         }
      }catch(erro){
         throw new HttpException(erro.name,500)
      }
   }



}
