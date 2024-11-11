import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostInstagramService } from './post-instagram.service';
import { CreatePostInstagramDto } from './dto/create-post-instagram.dto';
import { UpdatePostInstagramDto } from './dto/update-post-instagram.dto';

@Controller('post-instagram')
export class PostInstagramController {
  constructor(private readonly postInstagramService: PostInstagramService) {}

  @Post()
  create(@Body() createPostInstagramDto: CreatePostInstagramDto) {
    return this.postInstagramService.create(createPostInstagramDto);
  }

  @Get()
  findAll() {
    return this.postInstagramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postInstagramService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostInstagramDto: UpdatePostInstagramDto) {
    return this.postInstagramService.update(+id, updatePostInstagramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postInstagramService.remove(+id);
  }
}
