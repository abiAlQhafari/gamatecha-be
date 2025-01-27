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
  Req,
} from '@nestjs/common';
import { PostInstagramService } from './post-instagram.service';
import { CreatePostInstagramDto } from './dto/create-post-instagram.dto';
import { UpdatePostInstagramDto } from './dto/update-post-instagram.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auths/jwt-auth.guard';
import {
  CreateSwaggerExample,
  DetailSwaggerExample,
} from '../../common/swagger/swagger-example.response';
import { ResponsePostInstagramDto } from './dto/response-post-instagram.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { ResponseArticleDto } from '../articles/dto/response-article.dto';

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

  @Get(':id/convert-to-article')
  @DetailSwaggerExample(
    ResponseArticleDto,
    'Mengkonversi Post Instagram Menjadi Artikel',
  )
  async convertToArticle(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseArticleDto>> {
    const result = await this.postInstagramService.convertToArticle(
      +id,
      req.user,
    );
    return {
      data: plainToInstance(ResponseArticleDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
