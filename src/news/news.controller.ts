/* eslint-disable prettier/prettier */
import { NewsService } from './news.service';
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateNewsDto } from './dto/createNews.dto'
import { UpdateNewsDto } from './dto/updateNews.dto';
import { CheckMongoIdPipe } from 'src/common/pipes/check-valid-id.pipe';
@Controller('news')
export class NewsController {
   constructor(
      private readonly newsService:NewsService,
   ){}

   @Post('add-news')
   async addNews(@Body(ValidationPipe) newsInfo: CreateNewsDto){
      return await this.newsService.createNews(newsInfo)
   }

   @Get('get-news')
   async getNews(){
      return await this.newsService.getNews()
   }

   @Put('update-news/:id')
   async updateNews(@Body(ValidationPipe) newsInfo: UpdateNewsDto,@Param('id', CheckMongoIdPipe) id : string){
      return await this.newsService.updateNews(newsInfo, id)
   }

   @Delete('delete-news')
   async deleteNews(@Param('id',CheckMongoIdPipe) id : string){
      return await this.newsService.deleteNew(id)
   }
}
