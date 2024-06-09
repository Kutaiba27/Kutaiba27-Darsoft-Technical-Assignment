/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [
      MongooseModule.forRootAsync({
         inject:[ConfigService],
         useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_DB_URL')
         })
      })
   ]
   })

export class DatabaseModule {}