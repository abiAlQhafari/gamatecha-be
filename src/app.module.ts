import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { BaseValidationPipe } from './common/pipe/base-validation.pipes';
import { AllExceptionFilter } from './common/exception/base.exception';
import { UserModule } from './common/user/user.module';
import { AuthsModule } from './common/auths/auths.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.config';
import { SeedersModule } from './database/seeders/seeders.module';
import { UserInstagramModule } from './modules/user-instagram/user-instagram.module';

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
    CacheModule.registerAsync(RedisOptions),
    SeedersModule,
    UserModule,
    AuthsModule,
    UserInstagramModule,
  ],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_PIPE, useClass: BaseValidationPipe },
  ],
})
export class AppModule {}
