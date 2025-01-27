import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { ListSwaggerExample } from '../../common/swagger/swagger-example.response';
import { ResponseArticlePublic } from './dto/response-public-article.dto';
import { QueryParameterDto } from '../../common/dto/query-parameter.dto';
import { plainToInstance } from 'class-transformer';
import { ResponsePublicCategoryDto } from './dto/response-public-categories.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { FilteringArticle } from './dto/filtering-article.dto';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('articles')
  @ListSwaggerExample(ResponseArticlePublic, 'List of Articles')
  async getArticles(@Query() queryParameter: FilteringArticle) {
    const { page = 1, limit = 10 } = queryParameter;
    const [result, total] =
      await this.publicService.getArticles(queryParameter);

    return {
      data: plainToInstance(ResponseArticlePublic, result, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page: page,
        totalData: total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  @Get('categories')
  @ListSwaggerExample(ResponsePublicCategoryDto, 'List of Categories')
  async getCategories(
    @Query() queryParameter: QueryParameterDto,
  ): Promise<BaseSuccessResponse<ResponsePublicCategoryDto>> {
    const { page = 1, limit = 10 } = queryParameter;
    const [result, total] =
      await this.publicService.getCategories(queryParameter);

    return {
      data: plainToInstance(ResponsePublicCategoryDto, result, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page: page,
        totalData: total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }
}
