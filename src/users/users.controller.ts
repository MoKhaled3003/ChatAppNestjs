import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  UsersService
} from './users.service';
import {
  CreateUserDTO
} from './users.dto'
import {
  MyLogger
} from '../logger/logger.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private logger: MyLogger = new MyLogger('UsersControllerLogger')) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'The user has validation errors.'})
  @ApiResponse({ status: 500, description: 'internal server error.'})
  async register(@Body() createUserDTO: CreateUserDTO): Promise < void > {
    this.logger.log(`trying to create ${JSON.stringify(createUserDTO)} at ${new Date().toUTCString()}`, "UsersControllerLogger")
    return this.usersService.create(createUserDTO);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 200, description: 'The user logged in'})
  @ApiResponse({ status: 401, description: 'The user is not authorized'})
  login(@Body() createUserDTO: CreateUserDTO): Promise < {
    accessToken: string
  } > {
    this.logger.log(`trying to log in ${JSON.stringify(createUserDTO)} at ${new Date().toUTCString()}`, "UsersControllerLogger")
    return this.usersService.findUser(createUserDTO);
  }
}