import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { 
  Body,
  Logger,
  Req,
  UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './message.service';
import { CreateMessageDTO } from './message.dto';
import { MyLogger } from 'src/logger/logger.service';

@UseGuards(AuthGuard('jwt'))
@WebSocketGateway()

export class MessageGateway {
  @WebSocketServer() wss: Server;
  private logger : MyLogger = new MyLogger('MessageGatewayLogger')
  constructor(private  messageService: MessagesService) {}
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, @Body() createMessageDTO: CreateMessageDTO,@Req() req): void {
   this.logger.verbose(`${req.user.username} has sent message to all ${JSON.stringify(createMessageDTO)} at ${new Date().toUTCString()}`,"MessageGatewayLogger")
   this.wss.emit('messageToClient',createMessageDTO)
   this.messageService.createMessage(createMessageDTO,req.user);
  }
}
