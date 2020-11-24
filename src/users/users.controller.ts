import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Req,
  HttpStatus
} from '@nestjs/common';
import {
  UsersService
} from './users.service';
import {
  CreateUserDTO
} from './users.dto'
import {
  MyLogger
} from 'src/logger/logger.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private logger: MyLogger = new MyLogger('UsersControllerLogger')) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDTO: CreateUserDTO): Promise < void > {
    this.logger.log(`User has been created ${JSON.stringify(createUserDTO)} at ${new Date().toUTCString()}`, "UsersControllerLogger")
    return this.usersService.create(createUserDTO);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() createUserDTO: CreateUserDTO): Promise < {
    accessToken: string
  } > {
    this.logger.log(`User has been logged in ${JSON.stringify(createUserDTO)} at ${new Date().toUTCString()}`, "UsersControllerLogger")
    return this.usersService.findUser(createUserDTO);
  }

  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}