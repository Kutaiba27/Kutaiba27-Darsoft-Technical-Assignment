/* eslint-disable prettier/prettier */
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {redisStore} from 'cache-manager-redis-store';


@Module({
   imports: [
      MongooseModule.forRootAsync({
         inject:[ConfigService],
         useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_DB_URL'),
            onConnectionCreate() {
               const logger = new Logger("Mongoose Module")
               logger.fatal('MongoDb connection created')
            },
         })
      }),
      CacheModule.registerAsync({
         inject:[ConfigService],
         isGlobal: true,
         useFactory: async (config:ConfigService)=>{
            const store = await redisStore({
               socket:{
                  port: config.get<number>('REDIS_PORT'),
                  host: config.get<string>('REDIS_HOST'),
               }
            }).then(()=>{
               const logger = new Logger("Redis Module")
               logger.fatal('Redis connection created')
            })
            return {
               store: ()=> store as any
            }
         },
      })
   ]
   })

export class DatabaseModule {}
