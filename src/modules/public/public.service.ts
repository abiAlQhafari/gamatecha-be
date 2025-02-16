import { Injectable } from '@nestjs/common';
import { ArticleService } from '../articles/articles.service';
import { ArticleStatus } from '../../common/enum/status.enum';
import { CategoriesService } from '../categories/categories.service';
import { Article } from '../articles/entities/article.entity';

@Injectable()
export class PublicService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoriesService,
  ) {}

  async getArticles(query: any) {
    const { page, limit, search } = query;

    query.status = ArticleStatus.PUBLISHED;

    const articles = await this.articleService.findAndCount(query);

    return articles;
  }

  async getOneArticles(slug: string): Promise<Article> {
    const article = await this.articleService.findOneBy({
      where: { slug, status: ArticleStatus.PUBLISHED },
      relations: ['categories', 'postInstagram'],
    });

    return article;
  }

  async getCategories(query: any) {
    const categories = await this.categoryService.findAndCount(query);

    return categories;
  }
}
