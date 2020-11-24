import {Test, TestingModule} from '@nestjs/testing'
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import {User} from './users.model'
import {Model} from 'mongoose'
const mockUserModel = ()=>({

});

describe('UserService',()=>{
    let userModel;
    let usersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [UsersService,User],
        }).compile();
    
        usersService = module.get<UsersService>(UsersService);
        userModel = module.get<User>(Model);

      });
      
      it('should be defined', () => {
        expect(usersService).toBeDefined();
      });
})