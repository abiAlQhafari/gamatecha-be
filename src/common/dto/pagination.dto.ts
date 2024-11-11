import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { QueryParameterDto } from './query-parameter.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional()
  limit: number = 10;
}
