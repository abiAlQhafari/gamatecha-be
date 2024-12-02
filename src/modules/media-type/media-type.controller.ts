import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaTypeService } from './media-type.service';
import { CreateMediaTypeDto } from './dto/create-media-type.dto';
import { UpdateMediaTypeDto } from './dto/update-media-type.dto';

@Controller('media-type')
export class MediaTypeController {
  constructor(private readonly mediaTypeService: MediaTypeService) {}

  @Post()
  create(@Body() createMediaTypeDto: CreateMediaTypeDto) {
    return this.mediaTypeService.create(createMediaTypeDto);
  }

  @Get()
  findAll() {
    return this.mediaTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaTypeDto: UpdateMediaTypeDto) {
    return this.mediaTypeService.update(+id, updateMediaTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaTypeService.remove(+id);
  }
}
