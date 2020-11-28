
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './users.model';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';
import { LoggerModule } from '../logger/looger.module';

@Module({
  imports: [LoggerModule,MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  PassportModule.register({defaultStrategy : 'jwt'}),
  JwtModule.register({
    secret : 'hakonamatata'
  })],
  controllers: [UsersController],
  providers: [JwtStrategy,UsersService],
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class UsersModule {}