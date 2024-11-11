import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionResponse } from '../../response/base.response';

export class NotFoundException extends HttpException {
  constructor(detail?: string) {
    const errorFormat = new BaseExceptionResponse(
      'notFound',
      detail ? detail : 'Resource not found.',
    );
    super(errorFormat, HttpStatus.NOT_FOUND);
  }
}
