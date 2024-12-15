import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserInstagramDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string = '';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profilePic: string = '';
}
