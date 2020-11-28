import { User } from './users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import {jwtpayload} from './jwtpayload.interface'
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel('User') private readonly UserModel : Model<User> 
    ){
        super({
            //custom jwt extractor to extract JWT token from query param in sockeio connection by vuejs app
            jwtFromRequest : function(client) {
                var token = null;
                if (client && client.handshake.query.token) {
                    token = client.handshake.query.token;
                }
                return token;
            },
            secretOrKey : process.env.JWT_SECRET
        })
    }
    async validate(payload: jwtpayload){
      if(payload.username){
        let username = payload.username
        const user = await this.UserModel.findOne({ username })
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
      }else{
        throw new UnauthorizedException('malformed token')
      }      
    }
}