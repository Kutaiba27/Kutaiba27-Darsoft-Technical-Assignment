/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from 'src/database/schemas/address.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{name: Address.name, schema:AddressSchema }])
  ],
  controllers: [AddressController],
  providers: [AddressService, JwtAuthGuard, RoleGuard]
})
export class AddressModule {}
