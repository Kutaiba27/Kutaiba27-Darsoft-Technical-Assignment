/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { 
   OnGatewayConnection, 
   OnGatewayDisconnect, 
   OnGatewayInit, 
   SubscribeMessage, 
   WebSocketGateway, 
   WebSocketServer
} from "@nestjs/websockets";
import { Model } from "mongoose";

import { Server, Socket } from "socket.io";
import { News } from "src/database/schemas/news.schema";


@WebSocketGateway({ cors: { origin: '*' } })
export class NewsWebSocketGetWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

   constructor(
      @InjectModel(News.name) private readonly NewsModel: Model<News> 
   ){}
   private logger =  new Logger(NewsWebSocketGetWay.name);
   @WebSocketServer() server: Server;

   afterInit(){
      this.logger.log('Initializing getWay');
   }

   async handleConnection(client: Socket, ...args: any[]) {
      const { sockets } = this.server.sockets;
      this.logger.log(`Client id: ${client.id} connected`);
      this.logger.debug(`Number of connected clients: ${sockets.size}`);
   }

   handleDisconnect(client: any) {
      this.logger.log(`Cliend id:${client.id} disconnected`);
   }

   @SubscribeMessage("ping")
   async handleMessage(client: any, data: any) {
      this.logger.log(`Message received from client id: ${client.id}`);
      this.logger.debug(`Payload: ${data}`);
      return {
      event: "news",
      data: await this.NewsModel.find(),
      };
   }
}