import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ResponseUserDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  username: string;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  // @Expose()
  // @IsOptional()
  // @ApiPropertyOptional()
  // @Type(() => ResponseUserExtendDto)
  // userExtend?: ResponseUserExtendDto;
}
