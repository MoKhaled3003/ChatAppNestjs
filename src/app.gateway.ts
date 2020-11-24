import {  WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { 
  UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MyLogger } from 'src/logger/logger.service';


@WebSocketGateway()

export class AppGateway implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit {

  @WebSocketServer() wss: Server;
  private logger : MyLogger = new MyLogger('AppGatewayLogger')


  afterInit(server: Server) {
    this.logger.log('app gateway initialized','AppGatewayLogger')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected : ${client.id} at ${new Date().toUTCString()}`,'AppGatewayLogger')
  }
  
  @UseGuards(AuthGuard('jwt'))
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected : ${client.id} at ${new Date().toUTCString()}`,'AppGatewayLogger')
  }
}
