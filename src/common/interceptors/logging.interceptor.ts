import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from '../middlewares/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const start = Date.now();

    logger.info(
      `Incoming Request: ${method} ${url} from IP: ${ip} at ${new Date(start).toISOString()}`,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        logger.info(
          `Completed Request: ${method} ${url} from IP: ${ip} - ${duration}ms`,
        );
      }),
    );
  }
}
