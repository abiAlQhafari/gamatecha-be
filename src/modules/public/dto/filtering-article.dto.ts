import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
import { IsOptional } from 'class-validator';

export class FilteringArticle extends QueryParameterDto {
  @ApiPropertyOptional()
  @IsOptional()
  categories_id?: number;
}
