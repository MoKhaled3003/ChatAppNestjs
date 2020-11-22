import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Logger
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import {CreateUserDTO} from './users.dto'

  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    private logger : Logger = new Logger('AppGatewayLogger')
  
    @Post('/register')
    @UsePipes(ValidationPipe)
    async register(@Body() createUserDTO: CreateUserDTO):Promise<void> {
      this.logger.verbose(`User has been created ${createUserDTO} at ${Date.now}`)
      return this.usersService.create(createUserDTO);
    }
  
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() createUserDTO: CreateUserDTO): Promise<{accessToken : string}> {
      this.logger.verbose(`User has been logged in ${createUserDTO} at ${Date.now}`)
      return this.usersService.findUser(createUserDTO);
    }
  }
  