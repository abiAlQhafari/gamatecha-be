import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { BaseValidationPipe } from './common/pipe/base-validation.pipes';
import { AllExceptionFilter } from './common/exception/base.exception';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => await typeOrmConfig(),
      inject: [],
    }),
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     connection: {
    //       host: configService.get('REDIS_HOST'),
    //       port: configService.get('REDIS_PORT'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_PIPE, useClass: BaseValidationPipe },
  ],
})
export class AppModule {}
