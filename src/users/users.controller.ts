import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import {CreateUserDTO} from './users.dto'

  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('/register')
    @UsePipes(ValidationPipe)
    async register(@Body() createUserDTO: CreateUserDTO):Promise<void> {
      return this.usersService.create(createUserDTO);
    }
  
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() createUserDTO: CreateUserDTO): Promise<{accessToken : string}> {
      return this.usersService.findUser(createUserDTO);
    }
  }
  