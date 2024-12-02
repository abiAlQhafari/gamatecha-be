import { PartialType } from '@nestjs/swagger';
import { CreatePostInstagramDto } from './create-post-instagram.dto';

export class UpdatePostInstagramDto extends PartialType(
  CreatePostInstagramDto,
) {}
