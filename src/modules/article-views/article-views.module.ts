import { Module } from '@nestjs/common';
import { ArticleViewsService } from './article-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleView } from './entities/article-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleView])],
  providers: [ArticleViewsService],
  exports: [ArticleViewsService],
})
export class ArticleViewsModule {}
