import { Injectable } from '@nestjs/common';
import { CreatePostInstagramDto } from './dto/create-post-instagram.dto';
import { UpdatePostInstagramDto } from './dto/update-post-instagram.dto';
import { BaseService } from '../../common/service/base.service';
import { PostInstagram } from './entities/post-instagram.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostInstagramService extends BaseService<
  PostInstagram,
  CreatePostInstagramDto
> {
  constructor(
    @InjectRepository(PostInstagram)
    private readonly repository: Repository<PostInstagram>,
  ) {
    super(repository);
  }
}
