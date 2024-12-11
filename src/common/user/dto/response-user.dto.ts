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
  id: number | null = null;

  @Expose()
  @ApiProperty()
  @IsString()
  username: string | null = null;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string | null = null;

  @Expose()
  @ApiProperty()
  @IsDate()
  createdAt: Date | null = null;

  @Expose()
  @ApiProperty()
  @IsDate()
  updatedAt: Date | null = null;

  // @Expose()
  // @IsOptional()
  // @ApiPropertyOptional()
  // @Type(() => ResponseUserExtendDto)
  // userExtend?: ResponseUserExtendDto;
}
