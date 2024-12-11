import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionResponse } from 'src/common/response/base.response';

export class BadRequestException extends HttpException {
  constructor(details?: BaseExceptionResponse | BaseExceptionResponse[]) {
    super(details || 'Bad Request', HttpStatus.BAD_REQUEST);
  }
}
