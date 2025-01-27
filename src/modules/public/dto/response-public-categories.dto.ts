import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponsePublicCategoryDto {
  @ApiProperty()
  @Expose()
  id: number | null = null;

  @ApiProperty()
  @Expose()
  name: string = '';
}
