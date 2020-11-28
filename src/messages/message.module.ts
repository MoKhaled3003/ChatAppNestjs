import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './message.service';
import { MessageSchema } from './message.model';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
  controllers: [],
  providers: [MessagesService,MessageGateway]
})
export class MessageModule {}