import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.model';
import { User } from '../users/users.model';
import { CreateMessageDTO } from './message.dto';


@Injectable()
export class MessagesService {
constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

async createMessage(createMessageDTO: CreateMessageDTO,user: User): Promise<any> {
    let createdMessage = new this.messageModel(createMessageDTO);
    createdMessage.owner = user;
    return await createdMessage.save();
}

}