import { Injectable } from '@nestjs/common';
import { ArticleService } from '../articles/articles.service';
import { ArticleStatus } from '../../common/enum/status.enum';

@Injectable()
export class PublicService {
  constructor(private readonly articleService: ArticleService) {}

  async getArticles(query: any) {
    query.page = query.page || 1;
    query.limit = query.limit || 10;
    query.status = ArticleStatus.PUBLISHED;

    const articles = await this.articleService.findAndCount(query);

    return articles;
  }
}
