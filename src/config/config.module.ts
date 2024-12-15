import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
