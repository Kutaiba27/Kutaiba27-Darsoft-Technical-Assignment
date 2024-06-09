/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import {News, NewsSchema  } from '../database/schemas/news.schema'
import { CheckMongoIdPipe } from 'src/common/pipes/check-valid-id.pipe';
import { NewsController } from './news.controller';
import { NewsWebSocketGetWay } from './news.websocket.gateway';

@Module({
  imports:[MongooseModule.forFeature([{name: News.name, schema: NewsSchema}])],
  providers: [NewsWebSocketGetWay,NewsService,CheckMongoIdPipe],
  controllers: [NewsController]
})
export class NewsModule {}
