import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MessageModule } from './messages/message.module';
import { LoggerModule } from './logger/looger.module';

@Module({
  imports: [LoggerModule,MessageModule,UsersModule,MongooseModule.forRoot('mongodb://localhost:27017/Chat')],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
