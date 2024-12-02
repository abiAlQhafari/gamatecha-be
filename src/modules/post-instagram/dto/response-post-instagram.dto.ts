import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseMediaTypeDto } from '../../media-type/dto/response-media-type.dto';
import { ResponseUserInstagramDto } from '../../user-instagram/dto/response-user-instagram.dto';

export class ResponsePostInstagramDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  instagramPk: string;

  @Expose()
  @ApiProperty()
  instagramId: string;

  @Expose()
  @ApiProperty()
  code: string;

  @Expose()
  @ApiProperty()
  takenAt: Date;

  @Expose()
  @ApiProperty()
  thumbnailUrl: string;

  @Expose()
  @ApiProperty()
  mediaUrl: string;

  @Expose()
  @ApiProperty()
  caption: string;

  @Expose()
  @ApiProperty()
  postUrl: string;

  @Expose()
  @ApiProperty({ type: () => ResponseMediaTypeDto })
  @Type(() => ResponseMediaTypeDto)
  mediaType: ResponseMediaTypeDto;

  @Expose()
  @ApiProperty({ type: () => ResponseUserInstagramDto })
  @Type(() => ResponseUserInstagramDto)
  user: ResponseUserInstagramDto;
}
