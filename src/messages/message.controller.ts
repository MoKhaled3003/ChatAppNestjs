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
  import { GetUser } from 'src/users/get-user.decorator';
  import { User } from 'src/users/users.model';

  @UseGuards(AuthGuard('jwt'))
  @Controller('messages')
  export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}
    
    @Post('/')
    @UsePipes(ValidationPipe)
    async register(@Body() createMessageDTO: CreateMessageDTO,@Req() req):Promise<void> {
        console.log(req.user)
        return this.messageService.createMessage(createMessageDTO,req.user);
    }
  }
  