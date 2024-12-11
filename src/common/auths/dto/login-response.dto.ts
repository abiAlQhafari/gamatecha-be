import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginResponseDto {
  @IsString()
  @Expose()
  @ApiProperty()
  accessToken: string | null = null;

  @IsString()
  @Expose()
  @ApiProperty()
  refreshToken: string | null = null;
}
