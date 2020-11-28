import {
  Test,
  TestingModule
} from '@nestjs/testing'
import {
  UsersService
} from './users.service';
import {
  CreateUserDTO
} from './users.dto';
import {
  UsersController
} from './users.controller';
import {
  INestApplication, ValidationPipe
} from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';
import { verbose } from 'winston';

const mockedUser: CreateUserDTO = {
  username: 'mokhaled',
  password: 'hakona123'
}


describe('UserController', () => {
  let app: INestApplication;
  let userData;
  beforeEach(async () => {
    userData = {
      ...mockedUser
    }
    const usersService = {
      create: jest.fn().mockResolvedValue(userData),
      findUser: jest.fn().mockReturnValue("sdsdapjdoas")
    }
    const mockedLogger = {
      log:jest.fn()
      }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,{
        provide: MyLogger,
        useValue: mockedLogger
      }],
    }).compile();
    let usersService = await module.get(UsersService);
    usersService = await module.get(UsersService);

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

it('should be defined', () => {
    expect(UsersController).toBeDefined();
  });
})

// describe('when registering with valid data', () => {
//   it('should respond with the data of the user without the password', () => {
//     const expectedData = {
//       ...userData
//     }
//     delete expectedData.password;
//     return request(app.getHttpServer())
//       .post('/users/register')
//       .send({
//         email: mockedUser.email,
//         name: mockedUser.name,
//         password: 'strongPassword'
//       })
//       .expect(201)
//       .expect(expectedData);
//   })
// })