import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class QueryParameterDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
  orderDirection?: 'ASC' | 'DESC';

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}
