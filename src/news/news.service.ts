/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News } from '../database/schemas/news.schema'
import { Model } from 'mongoose';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';

@Injectable()
export class NewsService {
   constructor(
      @InjectModel(News.name) private readonly NewsModel: Model<News>
   ){}

   async createNews(news: CreateNewsDto): Promise<News>{
      return await this.NewsModel.create(news)
   }

   async getNews(): Promise<News[]>{
      return await this.NewsModel.find().exec()
   }

   async deleteNew(id: string){
      await this.NewsModel.deleteOne({id:id})
   }

   async updateNews(news: UpdateNewsDto, id:string){
      await this.NewsModel.updateOne({id:id},{...news})
   }
}
