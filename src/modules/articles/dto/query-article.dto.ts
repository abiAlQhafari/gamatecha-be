import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryParameterArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;
}
