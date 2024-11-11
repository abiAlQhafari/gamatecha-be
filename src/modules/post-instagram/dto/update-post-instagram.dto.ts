import { PartialType } from '@nestjs/mapped-types';
import { CreatePostInstagramDto } from './create-post-instagram.dto';

export class UpdatePostInstagramDto extends PartialType(CreatePostInstagramDto) {}
