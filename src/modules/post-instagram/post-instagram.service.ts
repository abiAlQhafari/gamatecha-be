import { Injectable } from '@nestjs/common';
import { CreatePostInstagramDto } from './dto/create-post-instagram.dto';
import { UpdatePostInstagramDto } from './dto/update-post-instagram.dto';

@Injectable()
export class PostInstagramService {
  create(createPostInstagramDto: CreatePostInstagramDto) {
    return 'This action adds a new postInstagram';
  }

  findAll() {
    return `This action returns all postInstagram`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postInstagram`;
  }

  update(id: number, updatePostInstagramDto: UpdatePostInstagramDto) {
    return `This action updates a #${id} postInstagram`;
  }

  remove(id: number) {
    return `This action removes a #${id} postInstagram`;
  }
}
