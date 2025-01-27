import { Injectable, NestMiddleware } from '@nestjs/common';
import { logger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const elapsedTime = Date.now() - start;
      logger.info(`${method} ${originalUrl} ${statusCode} - ${elapsedTime}ms`);
    });
    res.on('error', (error) => {
      const elapsedTime = Date.now() - start;
      logger.error(
        `Error on ${method} ${originalUrl} - ${elapsedTime}ms - ${error.message}`,
      );
    });
    next();
  }
}
