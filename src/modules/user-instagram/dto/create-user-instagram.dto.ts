import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInstagramDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
}
