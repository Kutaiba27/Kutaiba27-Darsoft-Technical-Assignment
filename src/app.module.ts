/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config.dev.env',
      isGlobal: true
    }),
    DatabaseModule, UserModule, AuthModule, AddressModule, NewsModule],
})
export class AppModule {
  constructor(private readonly config: ConfigService){
    console.log(config.get<string>("MONGO_DB_URL"))
  }
}
