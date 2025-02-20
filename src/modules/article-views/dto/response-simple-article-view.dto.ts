import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ResponseSimpleArticleViewDto {
  @ApiProperty()
  @Expose()
  id: number;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @Expose()
  ipAddr: string;

  @ApiProperty()
  @Expose()
  userAgent: string;
}
