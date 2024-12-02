import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostInstagramService } from './post-instagram.service';
import { CreatePostInstagramDto } from './dto/create-post-instagram.dto';
import { UpdatePostInstagramDto } from './dto/update-post-instagram.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auths/jwt-auth.guard';
import { CreateSwaggerExample } from '../../common/swagger/swagger-example.response';
import { ResponsePostInstagramDto } from './dto/response-post-instagram.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';

@ApiTags('Post Instagram')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('post-instagram')
export class PostInstagramController {
  constructor(private readonly postInstagramService: PostInstagramService) {}

  @Post()
  @CreateSwaggerExample(
    CreatePostInstagramDto,
    ResponsePostInstagramDto,
    true,
    'Membuat Sebuah Post Instagram',
  )
  async create(
    @Body() createPostInstagramDto: CreatePostInstagramDto,
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponsePostInstagramDto>> {
    const result = await this.postInstagramService.create(
      createPostInstagramDto,
      req.user,
    );
    return {
      data: plainToInstance(ResponsePostInstagramDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  // @Get()
  // findAll() {
  //   return this.postInstagramService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postInstagramService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePostInstagramDto: UpdatePostInstagramDto,
  // ) {
  //   return this.postInstagramService.update(+id, updatePostInstagramDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postInstagramService.remove(+id);
  // }
}
