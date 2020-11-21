import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './users.model';
import { CreateUserDTO } from './users.dto';
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt'
import {jwtpayload} from './jwtpayload.interface'

@Injectable()
export class UsersService {
constructor(@InjectModel('User') private readonly UserModel : Model<User>,private jwtService: JwtService) {}

async create(createUserDTO: CreateUserDTO): Promise<any> {
    let {password} = createUserDTO;
    let salt = await bcrypt.genSalt();
    let hash = await this.hashPassword(password,salt);
    createUserDTO.password = hash
    const createdUser = new this.UserModel(createUserDTO);

try{
    return await createdUser.save();
}catch(error){
    if(error.code == '11000'){
        throw new ConflictException('username is already exists');
    }else {
        throw new InternalServerErrorException();
    }
}
}

async findUser(createUserDTO): Promise<{accessToken : string}> {
    let {username,password} = createUserDTO
    let user =  await this.UserModel.findOne({username}).exec();
    console.log(user)
    if(user && await this.verifyPassword(password,user.password)){
        let payload : jwtpayload = {username}
        let accessToken  =  this.jwtService.sign(payload);
        return {accessToken};
    }else{
        throw new UnauthorizedException('username or password are invalid')
    }
}
// async update(id, CreateUserDTO: CreateUserDTO): Promise<any> {
// return await this.UserModel.findByIdAndUpdate(id, CreateUserDTO, { new: true });
// }
// async delete(id): Promise<any> {
// return await this.UserModel.findByIdAndRemove(id);
// }

 private async hashPassword (password: string,salt: string): Promise<string>{
     return bcrypt.hash(password,salt);
 }
 private async verifyPassword (password: string,hashed: string): Promise<string>{
    return await bcrypt.compare(password,hashed);
}
}