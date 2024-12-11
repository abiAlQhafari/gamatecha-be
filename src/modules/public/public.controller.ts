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
import { ResponseArticlePublic } from './dto/response-public.dto';
import { QueryParameterDto } from '../../common/dto/query-parameter.dto';
import { plainToInstance } from 'class-transformer';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('articles')
  @ListSwaggerExample(ResponseArticlePublic, 'List of Articles')
  async getArticles(@Query() queryParameter: QueryParameterDto) {
    queryParameter.page = queryParameter.page || 1;
    queryParameter.limit = queryParameter.limit || 10;
    const [result, total] =
      await this.publicService.getArticles(queryParameter);

    console.log(result);

    return {
      data: plainToInstance(ResponseArticlePublic, result, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page: queryParameter.page,
        limit: queryParameter.limit,
        total: result.length,
      },
    };
  }
}
