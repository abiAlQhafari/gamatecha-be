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
  @IsString()
  title: string = '';

  @ApiProperty()
  mediaUrl: string = '';

  @ApiPropertyOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus = ArticleStatus.ARCHIVED;

  @ApiProperty()
  @IsString()
  content: string = '';

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  postInstagram_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  categories?: string[];
}
