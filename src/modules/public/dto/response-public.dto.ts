import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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

  @ApiProperty()
  @Expose()
  categories: any[] | null = null;

  @ApiProperty()
  @Expose()
  createdAt: Date | null = null;

  @ApiProperty()
  @Expose()
  updatedAt: Date | null = null;
}
