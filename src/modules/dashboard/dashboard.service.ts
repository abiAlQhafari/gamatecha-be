import { Injectable } from '@nestjs/common';
import { ArticleService } from '../articles/articles.service';
import { ArticleViewsService } from '../article-views/article-views.service';
import { UserInstagramService } from '../user-instagram/user-instagram.service';
import { ArticleStatus } from '../../common/enum/status.enum';
import { DataSource } from 'typeorm';
import { ArticleView } from '../article-views/entities/article-view.entity';
import { startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly articleService: ArticleService,
    private readonly articleViewsService: ArticleViewsService,
    private readonly userInstagramService: UserInstagramService,
  ) {}

  async getTotalArticle(): Promise<number> {
    return this.articleService.count({
      where: {
        status: ArticleStatus.PUBLISHED,
      },
    });
  }

  async getTotalUserInstagram(): Promise<number> {
    return this.userInstagramService.count();
  }

  async getChartArticleViews(): Promise<{ name: string; value: number }[]> {
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());

    const data = await this.dataSource
      .getRepository(ArticleView)
      .createQueryBuilder('article_view')
      .select([
        'DATE(article_view.createdAt) as date',
        'COUNT(article_view.id) as total',
      ])
      .where('article_view.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('DATE(article_view.createdAt)')
      .orderBy('date', 'ASC')
      .getRawMany();

    return data.map((item) => ({
      name: item.date,
      value: parseInt(item.total),
    }));
  }
}
