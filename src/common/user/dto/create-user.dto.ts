import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string = '';

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string = '';

  // @Type(() => CreateUserExtendDto || UpdateUserExtendDto)
  // @IsOptional()
  // @ApiPropertyOptional({ type: CreateUserExtendDto || UpdateUserExtendDto })
  // userExtend?: CreateUserExtendDto | UpdateUserExtendDto;
}
