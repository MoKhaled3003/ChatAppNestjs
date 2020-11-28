import { ApiProperty } from '@nestjs/swagger';
import { IsString,MinLength,MaxLength, IsNotEmpty } from 'class-validator'
export class CreateUserDTO {

@ApiProperty({ type:String })
@IsString()
@MinLength(4)
@MaxLength(10)
@IsNotEmpty()
readonly username: string;

@IsString()
@MinLength(4)
@MaxLength(10)
@IsNotEmpty()
@ApiProperty({ type:String})
password: string;
}
