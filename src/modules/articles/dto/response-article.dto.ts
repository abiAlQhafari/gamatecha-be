import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ResponsePostInstagramDto } from '../../post-instagram/dto/response-post-instagram.dto';
import { ResponseCategoryDto } from '../../categories/dto/response-category.dto';

export class ResponseArticleDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  id: number | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  title: string | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  slug: string | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  mediaUrl: string | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  content: string | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  status: string | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  publishedAt: string | null = null;

  @Expose()
  @ApiPropertyOptional({ type: () => [ResponseCategoryDto] })
  @IsOptional()
  @Type(() => ResponseCategoryDto)
  categories?: ResponseCategoryDto[];

  @Expose()
  @ApiPropertyOptional({ type: () => ResponsePostInstagramDto })
  @IsOptional()
  @Type(() => ResponsePostInstagramDto)
  postInstagram?: ResponsePostInstagramDto;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  createdAt?: Date;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  updatedAt?: Date;
}
