import { User } from './users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import {jwtpayload} from './jwtpayload.interface'

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
                    console.log(token)
                }
                console.log('>>>>>>after',token)
                return token;
            },
            secretOrKey : 'hakonamatata'
        })
    }
    async validate(payload: jwtpayload){
      console.log('herer is payload',payload)
        const {username} = payload;
        const user = await this.UserModel.findOne({ username })

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}