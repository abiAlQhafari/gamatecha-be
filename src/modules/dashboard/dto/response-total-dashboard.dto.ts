import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseTotalDashboardDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  total: number;
}
