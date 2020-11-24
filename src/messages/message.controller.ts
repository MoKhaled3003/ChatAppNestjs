import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Req,
    UseGuards,
  } from '@nestjs/common';
  
  import { MessagesService } from './message.service';
  import {CreateMessageDTO} from './message.dto'
  import { AuthGuard } from '@nestjs/passport';
  @Controller('messages')
  export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}
    
    @Post('/') 
    @UsePipes(ValidationPipe)
    async register(@Body() createMessageDTO: CreateMessageDTO,@Req() req):Promise<void> {
        return this.messageService.createMessage(createMessageDTO,req.user);
    }
  }
  