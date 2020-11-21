import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';
import { MessageSchema } from './message.model';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
  controllers: [MessagesController],
  providers: [MessagesService,MessageGateway]
})
export class MessageModule {}