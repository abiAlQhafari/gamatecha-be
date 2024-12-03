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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auths/jwt-auth.guard';
import {
  CreateSwaggerExample,
  DeleteSwaggerExample,
  DetailSwaggerExample,
  ListSwaggerExample,
} from '../../common/swagger/swagger-example.response';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { PathParameterDto } from '../../common/dto/path-parameter.dto';
import { UpdateResult } from 'typeorm';
import { QueryParameterDto } from '../../common/dto/query-parameter.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
@ApiTags('Categories')
// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @CreateSwaggerExample(
    CreateCategoryDto,
    ResponseCategoryDto,
    false,
    'Membuat satu Kategori',
  )
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseCategoryDto>> {
    const result = await this.categoryService.create(
      createCategoryDto,
      req.user,
    );
    return {
      data: plainToInstance(ResponseCategoryDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @CreateSwaggerExample(
    CreateCategoryDto,
    ResponseCategoryDto,
    true,
    'Membuat banyak Kategori',
  )
  @Post('bulk')
  async createMany(
    @Body() createCategoryDto: CreateCategoryDto[],
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseCategoryDto>> {
    const result = await this.categoryService.create(
      createCategoryDto,
      req.user,
    );
    return {
      data: plainToInstance(ResponseCategoryDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  @ListSwaggerExample(ResponseCategoryDto, 'Mengambil Semua Kategori')
  async findAll(
    @Request() req: any,
    @Query() queryParameterDto: QueryParameterDto,
  ): Promise<BaseSuccessResponse<ResponseCategoryDto>> {
    const { page = 1, limit = 10 } = queryParameterDto;
    const [result, total] =
      await this.categoryService.findAndCount(queryParameterDto);

    return {
      data: plainToInstance(ResponseCategoryDto, result, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page: page,
        totalData: total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  @DetailSwaggerExample(ResponseCategoryDto, 'Mengambil satu Kategori')
  async findOne(
    @Request() req: any,
    @Param() pathParameter: PathParameterDto,
  ): Promise<BaseSuccessResponse<ResponseCategoryDto>> {
    const result = await this.categoryService.findOneByOrFail(pathParameter);

    return {
      data: plainToInstance(ResponseCategoryDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  @DetailSwaggerExample(ResponseCategoryDto, 'Mengupdate satu Kategori')
  async update(
    @Param() pathParameter: PathParameterDto,
    @Body() updateDto: UpdateCategoryDto,
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseCategoryDto>> {
    const result = await this.categoryService.update(
      pathParameter,
      updateDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseCategoryDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @DeleteSwaggerExample('Menghapus satu Kategori', '')
  async remove(
    @Param() pathParameter: PathParameterDto,
    @Request() req: any,
  ): Promise<UpdateResult> {
    return await this.categoryService.remove(pathParameter, req.user);
  }
}
