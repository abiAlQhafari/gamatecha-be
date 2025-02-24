import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BaseValidationPipe } from './common/pipe/base-validation.pipes';
import { AllExceptionFilter } from './common/exception/base.exception';
import { UserModule } from './common/user/user.module';
import { AuthsModule } from './common/auths/auths.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.config';
import { UserInstagramModule } from './modules/user-instagram/user-instagram.module';
import { MediaTypeModule } from './modules/media-type/media-type.module';
import { PostInstagramModule } from './modules/post-instagram/post-instagram.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { StorageModule } from './modules/storage/storage.module';
import { PublicModule } from './modules/public/public.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ArticleViewsModule } from './modules/article-views/article-views.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => await typeOrmConfig(),
      inject: [],
    }),
    CacheModule.registerAsync(RedisOptions),
    UserModule,
    AuthsModule,
    UserInstagramModule,
    MediaTypeModule,
    PostInstagramModule,
    ArticlesModule,
    CategoriesModule,
    StorageModule,
    PublicModule,
    ArticleViewsModule,
    DashboardModule,
  ],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_PIPE, useClass: BaseValidationPipe },
  ],
})
export class AppModule {}
