import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class QueryParameterDto extends PaginationDto {
  // @IsInt()
  // @Type(() => Number)
  // @IsOptional()
  // @Min(1)
  // @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : 10))
  // @ApiPropertyOptional()
  // limit?: number;

  // @IsInt()
  // @Type(() => Number)
  // @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : 1))
  // @IsOptional()
  // @Min(1)
  // @ApiPropertyOptional()
  // page?: number;

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
