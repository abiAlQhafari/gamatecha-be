import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ResponsePostInstagramDto } from '../../post-instagram/dto/response-post-instagram.dto';

export class ResponseArticleDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  slug: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  mediaUrl: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  publishedAt: string;

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
