import { createLogger, format } from 'winston';
import { winstonConfig } from '../../config/winston.config';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [winstonConfig.transports[0]],
});
