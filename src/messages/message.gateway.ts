import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, WsResponse, ConnectedSocket, WsException } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { 
  Body,
  OnModuleInit,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './message.service';
import { CreateMessageDTO } from './message.dto';
import { MyLogger } from 'src/logger/logger.service';
import * as socketioJwt from 'socketio-jwt';
@UseGuards(AuthGuard('jwt'))
@WebSocketGateway()

export class MessageGateway implements OnModuleInit,OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit  {
  @WebSocketServer() wss: Server;
  private logger : MyLogger = new MyLogger('MessageGatewayLogger')
  constructor(private  messageService: MessagesService) {}

  onModuleInit() {
      this.wss.use(socketioJwt.authorize({
        secret: 'hakonamatata',
        handshake: true
      }));
  }
  afterInit(server: Server) {
 
    this.logger.log('app gateway initialized','MessageGatewayLogger')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected : ${client.id} at ${new Date().toUTCString()}`,'MessageGatewayLogger')
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected : ${client.id} at ${new Date().toUTCString()}`,'MessageGatewayLogger')
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @SubscribeMessage('messageToServer')
  handleMessage(@ConnectedSocket() client: Socket, @Body() createMessageDTO: CreateMessageDTO,@Req() req): void {
   this.logger.verbose(`${req.user.username} with socket id : ${client.id} has sent message to all ${JSON.stringify(createMessageDTO)} at ${new Date().toUTCString()}`,"MessageGatewayLogger")
   this.wss.emit('messageToClient',createMessageDTO)
   this.messageService.createMessage(createMessageDTO,req.user);
  }
}
