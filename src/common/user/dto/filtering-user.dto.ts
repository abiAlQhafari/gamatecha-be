import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { QueryParameterDto } from 'src/common/dto/query-parameter.dto';

export class FilteringUserDto extends QueryParameterDto {}
