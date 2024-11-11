import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @Type(() => UpdateUserExtendDto)
  // @ApiPropertyOptional()
  // userExtend?: UpdateUserExtendDto;
}
