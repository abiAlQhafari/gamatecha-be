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
  Query,
  HttpCode,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auths/jwt-auth.guard';
import {
  CreateSwaggerExample,
  DeleteSwaggerExample,
  DetailSwaggerExample,
  ListSwaggerExample,
} from '../../common/swagger/swagger-example.response';
import { ResponseArticleDto } from './dto/response-article.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { PathParameterDto } from '../../common/dto/path-parameter.dto';
import { UpdateResult } from 'typeorm';
import { QueryParameterDto } from '../../common/dto/query-parameter.dto';
import { ArticleService } from './articles.service';
import { QueryParameterArticleDto } from './dto/query-article.dto';

@Controller('articles')
@ApiTags('Articles')
// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @CreateSwaggerExample(
    CreateArticleDto,
    ResponseArticleDto,
    false,
    'Membuat satu Artikel',
  )
  @Post()
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseArticleDto>> {
    const result = await this.articleService.create(createArticleDto, req.user);
    return {
      data: plainToInstance(ResponseArticleDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @CreateSwaggerExample(
    CreateArticleDto,
    ResponseArticleDto,
    true,
    'Membuat satu Artikel',
  )
  @Post('bulk')
  async createMany(
    @Body() createArticleDto: CreateArticleDto[],
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseArticleDto>> {
    const result = await this.articleService.create(createArticleDto, req.user);
    return {
      data: plainToInstance(ResponseArticleDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  @ListSwaggerExample(ResponseArticleDto, 'Mengambil Semua Artikel')
  async findAll(
    @Request() req: any,
    @Query() queryParameterDto: QueryParameterDto,
  ): Promise<BaseSuccessResponse<ResponseArticleDto>> {
    const { page = 1, limit = 10 } = queryParameterDto;
    const [result, total] =
      await this.articleService.findAndCount(queryParameterDto);

    return {
      data: plainToInstance(ResponseArticleDto, result, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page: page,
        totalData: total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  @Get(':slug')
  @DetailSwaggerExample(ResponseArticleDto, 'Mengambil satu Artikel')
  async findOne(
    @Request() req: any,
    @Param() pathParameter: QueryParameterArticleDto,
  ): Promise<BaseSuccessResponse<ResponseArticleDto>> {
    const result = await this.articleService.findOneByOrFail(pathParameter);

    return {
      data: plainToInstance(ResponseArticleDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  @DetailSwaggerExample(ResponseArticleDto, 'Mengupdate satu Artikel')
  async update(
    @Param() pathParameter: PathParameterDto,
    @Body() updateDto: UpdateArticleDto,
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseArticleDto>> {
    const result = await this.articleService.update(
      pathParameter,
      updateDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseArticleDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @DeleteSwaggerExample('Menghapus satu Artikel', '')
  async remove(
    @Param() pathParameter: PathParameterDto,
    @Request() req: any,
  ): Promise<UpdateResult> {
    return await this.articleService.remove(pathParameter, req.user);
  }
}
