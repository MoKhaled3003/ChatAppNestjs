import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator'
import { CreateUserDTO} from '../users/users.dto'
export class CreateMessageDTO {

@ApiProperty()
@IsString()
@IsNotEmpty()
readonly text: string;

@ApiProperty()
owner: CreateUserDTO;
}
