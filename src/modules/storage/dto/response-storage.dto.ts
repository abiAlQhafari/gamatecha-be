import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseStorageDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  url: string | null = null;
}
