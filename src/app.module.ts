import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MessageModule } from './messages/message.module';
import { LoggerModule } from './logger/looger.module';
import { ConfigModule } from '@nestjs/config';


const getMongoUrl = () => {
  if (process.env.NODE_ENV == 'dev') {
    return  process.env.MONGODBDEV 
 } else {
    return process.env.MONGODBPROD
 }
};
@Module({
  imports: [ConfigModule.forRoot(),LoggerModule,MessageModule,UsersModule,MongooseModule.forRoot(getMongoUrl())],
  controllers: [],
  providers: [] 
})
export class AppModule {}
