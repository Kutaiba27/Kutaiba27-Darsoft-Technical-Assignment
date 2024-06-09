/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { JwtStrategy } from './stratigeis/jwt.strategies';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:  (config: ConfigService)=>({
        secret: config.get<string>("JWT_SECRET_KEY"),
        signOptions: {
          expiresIn: config.get<string>("JWT_EXPIRATION")
        }
      })
    })
  ],
  providers: [
    JwtStrategy,
    AuthService,
    TokenService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
