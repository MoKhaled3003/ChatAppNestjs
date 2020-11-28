import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './users.model';
import { CreateUserDTO } from './users.dto';
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt'
import {jwtpayload} from './jwtpayload.interface'
import { MyLogger } from '../logger/logger.service';

@Injectable()
export class UsersService {
constructor(@InjectModel('User') private readonly UserModel : Model<User>,private jwtService: JwtService,
private logger: MyLogger = new MyLogger('UsersControllerLogger')) {}

async create(createUserDTO: CreateUserDTO): Promise<any> {
    let {password} = createUserDTO;
    let salt = await bcrypt.genSalt();
    let hash = await this.hashPassword(password,salt);
    createUserDTO.password = hash
    const createdUser = new this.UserModel(createUserDTO);

try{
    let user : User = await createdUser.save();
    this.logger.log(`new user has been created ${user} at ${new Date().toUTCString()}`, "UsersServicesLogger")
    return user;
}catch(error){
    if(error.code == '11000'){
        this.logger.log(`User ${JSON.stringify(createUserDTO)} is already exists ${new Date().toUTCString()}`, "UsersServicesLogger")
        throw new ConflictException('username is already exists');
    }else {
        this.logger.error(`${error.message} with code : ${error.code} at saving user ${new Date().toUTCString()}`, "UsersServicesLogger")
        throw new InternalServerErrorException();
    }
}
}

async findUser(createUserDTO): Promise<{accessToken : string}> {
    let {username,password} = createUserDTO
    let user =  await this.UserModel.findOne({username}).exec();
    if(user && await this.verifyPassword(password,user.password)){
        let payload : jwtpayload = {username}
        let accessToken  =  this.jwtService.sign(payload);
        return {accessToken};
    }else{
        this.logger.log(`User ${JSON.stringify(createUserDTO)} has invalid credentials ${new Date().toUTCString()}`, "UsersServicesLogger")
        throw new UnauthorizedException('username or password are invalid')
    }
}

 private async hashPassword (password: string,salt: string): Promise<string>{
     return bcrypt.hash(password,salt);
 }
 private async verifyPassword (password: string,hashed: string): Promise<string>{
    return await bcrypt.compare(password,hashed);
}
}