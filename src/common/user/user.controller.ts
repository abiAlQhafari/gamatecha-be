import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  BaseExceptionResponse,
  BaseSuccessResponse,
} from 'src/common/response/base.response';
import {
  CreateSwaggerExample,
  DeleteSwaggerExample,
  DetailSwaggerExample,
  ListSwaggerExample,
} from 'src/common/swagger/swagger-example.response';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { FilteringUserDto } from './dto/filtering-user.dto';
import { User } from './entities/user.entity';
import { PathParameterDto } from '../dto/path-parameter.dto';
import { BadRequestException } from '../exception/types/bad-request.exception';

@Controller('users')
@ApiTags('User')
// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CreateSwaggerExample(
    CreateUserDto,
    ResponseUserDto,
    false,
    'Membuat satu User',
  )
  async create(
    @Body() createDto: CreateUserDto,
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const result = await this.userService.create(createDto, req.user);

    return {
      data: plainToInstance(ResponseUserDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Post('bulk')
  @CreateSwaggerExample(
    CreateUserDto,
    ResponseUserDto,
    true,
    'Membuat Banyak User',
  )
  async createMany(
    @Body() createManyDto: CreateUserDto[],
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const result = await this.userService.create(createManyDto, req.user);

    return {
      data: plainToInstance(ResponseUserDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  @ListSwaggerExample(ResponseUserDto, 'Mengambil Semua Data User')
  async findAll(
    @Request() req: any,
    @Query() queryParameterDto: FilteringUserDto,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const { page = 1, limit = 10 } = queryParameterDto;
    const [result, total] =
      await this.userService.findAndCount(queryParameterDto);

    return {
      data: plainToInstance(ResponseUserDto, result, {
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
  @DetailSwaggerExample(ResponseUserDto, 'Mengambil satu data User')
  async findOne(
    @Request() req: any,
    @Param() pathParameter: PathParameterDto,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    if (typeof pathParameter.id !== 'number') {
      throw new BadRequestException(
        new BaseExceptionResponse('400', 'Invalid ID'),
      );
    }
    const result = await this.userService.findOne(pathParameter.id);

    return {
      data: plainToInstance(ResponseUserDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  @DetailSwaggerExample(ResponseUserDto, 'Mengupdate satu data User')
  async update(
    @Param() pathParameter: PathParameterDto,
    @Body() updateDto: UpdateUserDto,
    @Request() req: any,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const result = await this.userService.update(
      pathParameter,
      updateDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseUserDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @DeleteSwaggerExample('Menghapus satu data User')
  async remove(
    @Param() pathParameter: PathParameterDto,
    @Request() req: any,
  ): Promise<UpdateResult> {
    return await this.userService.remove(pathParameter, req.user);
  }
}
