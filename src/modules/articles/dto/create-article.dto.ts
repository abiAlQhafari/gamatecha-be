import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { ArticleStatus } from '../../../common/enum/status.enum';
import { PostInstagram } from '../../post-instagram/entities/post-instagram.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string | null = null;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  mediaUrl: string | null = null;

  @ApiPropertyOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus = ArticleStatus.ARCHIVED;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string | null = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  postInstagram_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  categories?: [string];
}
