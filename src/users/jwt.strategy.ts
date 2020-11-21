import { User } from './users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import {jwtpayload} from './jwtpayload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel('User') private readonly UserModel : Model<User>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromUrlQueryParameter('token'),
            secretOrKey : 'hakonamatata'
        })
    }
    async validate(payload: jwtpayload){
        const {username} = payload;
        const user = await this.UserModel.findOne({ username })

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}