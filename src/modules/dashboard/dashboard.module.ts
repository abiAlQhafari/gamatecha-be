import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ArticlesModule } from '../articles/articles.module';
import { ArticleViewsModule } from '../article-views/article-views.module';
import { UserInstagramModule } from '../user-instagram/user-instagram.module';
import { PostInstagramModule } from '../post-instagram/post-instagram.module';

@Module({
  imports: [
    ArticlesModule,
    ArticleViewsModule,
    PostInstagramModule,
    UserInstagramModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
