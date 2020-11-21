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

@UseGuards(AuthGuard('jwt'))
@WebSocketGateway()

export class MessageGateway {
  constructor(private  messageService: MessagesService) {}

  @WebSocketServer() wss: Server;

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, @Body() createMessageDTO: CreateMessageDTO,@Req() req): void {
   this.wss.emit('messageToClient',createMessageDTO)
   this.messageService.createMessage(createMessageDTO,req.user);
  }
}
