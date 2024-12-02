import { Injectable } from '@nestjs/common';
import { CreateMediaTypeDto } from './dto/create-media-type.dto';
import { UpdateMediaTypeDto } from './dto/update-media-type.dto';

@Injectable()
export class MediaTypeService {
  create(createMediaTypeDto: CreateMediaTypeDto) {
    return 'This action adds a new mediaType';
  }

  findAll() {
    return `This action returns all mediaType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mediaType`;
  }

  update(id: number, updateMediaTypeDto: UpdateMediaTypeDto) {
    return `This action updates a #${id} mediaType`;
  }

  remove(id: number) {
    return `This action removes a #${id} mediaType`;
  }
}
