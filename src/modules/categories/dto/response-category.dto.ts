import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ResponseArticleDto } from '../../articles/dto/response-article.dto';

export class ResponseCategoryDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  id: number | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  name: string | null = null;

  @Expose()
  @ApiPropertyOptional()
  totalPost?: number;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  createdAt?: Date;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  updatedAt?: Date;

  @Expose()
  @ApiPropertyOptional({ type: [ResponseArticleDto] })
  @Type(() => ResponseArticleDto)
  articles?: ResponseArticleDto[];
}
