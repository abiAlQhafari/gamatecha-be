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
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  mediaUrl: string;

  @ApiPropertyOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  postInstagram_id?: number;
}
