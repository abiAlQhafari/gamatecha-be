import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponsePublicCategoryDto } from './response-public-categories.dto';

export class ResponseArticlePublic {
  @Expose()
  @ApiProperty()
  id: number | null = null;

  @Expose()
  @ApiProperty()
  title: string | null = null;

  @Expose()
  @ApiProperty()
  slug: string | null = null;

  @Expose()
  @ApiProperty()
  mediaUrl: string | null = null;

  @Expose()
  @ApiProperty()
  status: string | null = null;

  @Expose()
  @ApiProperty()
  content: string | null = null;

  @Expose()
  @ApiProperty()
  publishedAt: Date | null = null;

  @ApiProperty()
  @Expose()
  postInstagram?: any | null;

  @ApiProperty({
    type: () => [ResponsePublicCategoryDto],
  })
  @Expose()
  @Type(() => ResponsePublicCategoryDto)
  categories: ResponsePublicCategoryDto[] | null = null;

  @ApiProperty()
  @Expose()
  totalViewers: number;

  @ApiProperty()
  @Expose()
  createdAt: Date | null = null;

  @ApiProperty()
  @Expose()
  updatedAt: Date | null = null;
}
