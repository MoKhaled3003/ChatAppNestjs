import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { 
  Logger, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@WebSocketGateway()

export class AppGateway implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit {

  @WebSocketServer() wss: Server;
  private logger : Logger = new Logger('AppGatewayLogger')

  afterInit(server: Server) {
    this.logger.log('app gateway initialized')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected : ${client.id}`)
  }
  
  @UseGuards(AuthGuard('jwt'))
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected : ${client.id}`)
  }
}
