import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseCategoryDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  id: number | null = null;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  name: string | null = null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  createdAt?: Date;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  updatedAt?: Date;
}
