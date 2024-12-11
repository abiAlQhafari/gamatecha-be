import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseMediaTypeDto } from '../../media-type/dto/response-media-type.dto';
import { ResponseUserInstagramDto } from '../../user-instagram/dto/response-user-instagram.dto';

export class ResponsePostInstagramDto {
  @Expose()
  @ApiProperty()
  id: number | null = null;

  @Expose()
  @ApiProperty()
  instagramPk: string | null = null;

  @Expose()
  @ApiProperty()
  instagramId: string | null = null;

  @Expose()
  @ApiProperty()
  code: string | null = null;

  @Expose()
  @ApiProperty()
  takenAt: Date | null = null;

  @Expose()
  @ApiProperty()
  thumbnailUrl: string | null = null;

  @Expose()
  @ApiProperty()
  mediaUrl: string | null = null;

  @Expose()
  @ApiProperty()
  caption: string | null = null;

  @Expose()
  @ApiProperty()
  postUrl: string | null = null;

  @Expose()
  @ApiPropertyOptional({ type: () => ResponseMediaTypeDto })
  @Type(() => ResponseMediaTypeDto)
  mediaType: ResponseMediaTypeDto | null = null;

  @Expose()
  @ApiPropertyOptional({ type: () => ResponseUserInstagramDto })
  @Type(() => ResponseUserInstagramDto)
  user: ResponseUserInstagramDto | null = null;
}
