import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseCategoryDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  createdAt?: Date;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  updatedAt?: Date;
}
