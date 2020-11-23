import {Test, TestingModule} from '@nestjs/testing'
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import {User} from
const mockUserModel = ()=>({

});

describe('UserService',()=>{
    let userModel;
    let usersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [UsersService],
        }).compile();
    
        usersService = module.get<UsersService>(UsersService);
        userModel = module.get<UsersModel>(UsersModel);

      });
      
      it('should be defined', () => {
        expect(usersService).toBeDefined();
      });
})