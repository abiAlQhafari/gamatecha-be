import { PartialType } from '@nestjs/swagger';
import { CreateUserInstagramDto } from './create-user-instagram.dto';

export class UpdateUserInstagramDto extends PartialType(
  CreateUserInstagramDto,
) {}
