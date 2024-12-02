import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaTypeDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
}
