import { Injectable } from '@nestjs/common';
import { ArticleService } from '../articles/articles.service';
import { ArticleStatus } from '../../common/enum/status.enum';
import { CategoriesService } from '../categories/categories.service';
import { Article } from '../articles/entities/article.entity';
import { ArticleViewsService } from '../article-views/article-views.service';
import { Request } from 'express';
import { logger } from '../../common/middlewares/logger';
import { ResponseArticlePublic } from './dto/response-public-article.dto';

@Injectable()
export class PublicService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoriesService,
    private readonly articleViewService: ArticleViewsService,
  ) {}

  async getArticles(query: any) {
    const { page, limit, search } = query;

    query.status = ArticleStatus.PUBLISHED;

    const articles = await this.articleService.findAndCount(query);

    return articles;
  }

  async getOneArticles(
    slug: string,
    req: Request,
  ): Promise<ResponseArticlePublic> {
    const article = await this.articleService.findOneBy({
      where: { slug, status: ArticleStatus.PUBLISHED },
      relations: ['categories', 'postInstagram', 'articleViews'],
    });

    setImmediate(() => {
      this.articleViewService
        .create({
          article_id: article.id,
          ipAddr: req.ip,
          userAgent: req.headers['user-agent'],
        })
        .catch((err) => {
          if (err.status === 400) {
            logger.warn(
              `User ${req.ip} - ${req.headers['user-agent']} Telah Melihat Article`,
            );
          } else {
            logger.error('Gagal menyimpan data viewers: ', err);
          }
        });
    });

    return {
      ...article,
      totalViewers: article.articleViews.length,
    };
  }

  async getCategories(query: any) {
    const categories = await this.categoryService.findAndCount(query);

    return categories;
  }
}
