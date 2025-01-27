import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponsePostInstagramDto } from '../../post-instagram/dto/response-post-instagram.dto';

export class ResponseUserInstagramDto {
  @Expose()
  @ApiProperty()
  id: number | null = null;

  @Expose()
  @ApiProperty()
  username: string | null = null;

  @Expose()
  @ApiProperty()
  profilePic: string | null = null;

  @Expose()
  @ApiPropertyOptional()
  totalPost?: number;

  @Expose()
  @ApiPropertyOptional()
  @Type(() => ResponsePostInstagramDto)
  postInstagram?: ResponsePostInstagramDto[];

  @Expose()
  @ApiProperty()
  createdAt: Date | null = null;

  @Expose()
  @ApiProperty()
  updatedAt: Date | null = null;
}
