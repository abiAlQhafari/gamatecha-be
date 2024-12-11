import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { CreateSwaggerExample } from '../../common/swagger/swagger-example.response';
import { ResponseStorageDto } from './dto/response-storage.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @CreateSwaggerExample(
    UploadFileDto,
    ResponseStorageDto,
    false,
    'Mengupload File',
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseSuccessResponse<ResponseStorageDto>> {
    try {
      const url = await this.storageService.uploadFile(file, 'public-read');
      return {
        data: plainToInstance(
          ResponseStorageDto,
          { url: url },
          {
            excludeExtraneousValues: false,
          },
        ),
      };
    } catch (err) {
      throw err;
    }
  }
}
