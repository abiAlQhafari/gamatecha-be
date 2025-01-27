import { Inject, Injectable } from '@nestjs/common';
import { CreatePostInstagramDto } from './dto/create-post-instagram.dto';
import { UpdatePostInstagramDto } from './dto/update-post-instagram.dto';
import { BaseService } from '../../common/service/base.service';
import { PostInstagram } from './entities/post-instagram.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { TfIdf } from 'natural';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import cleanCaption from '../../common/utils/cleanCaption';
import { Article } from '../articles/entities/article.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ArticleService } from '../articles/articles.service';
import { ArticleStatus } from '../../common/enum/status.enum';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class PostInstagramService extends BaseService<
  PostInstagram,
  CreatePostInstagramDto
> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(PostInstagram)
    private readonly repository: Repository<PostInstagram>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly articleService: ArticleService,
  ) {
    super(repository);
  }

  async convertToArticle(id: number, user?: JwtPayloadDto): Promise<Article> {
    try {
      const post = await this.findOneBy({
        where: {
          id: id,
        },
        relations: ['user'],
      });

      if (!post) {
        this.logger.error('Post not found');
        throw new NotFoundException('Post not found');
      }

      const convertedTitle = await this.extractMainSentence(post.caption);

      const convertedCategories = this.extractCategories(post.caption);

      const article = await this.articleService.create({
        title: convertedTitle,
        mediaUrl: post.mediaUrl,
        content: post.caption,
        status: ArticleStatus.ARCHIVED,
        categories: [convertedCategories[0]],
        postInstagram_id: post.id,
      });

      return Array.isArray(article) ? article[0] : article;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async extractMainSentence(caption: string): Promise<string> {
    const sentences = cleanCaption(caption);
    const tfidf = new TfIdf();

    sentences.forEach((sentence) => tfidf.addDocument(sentence));

    let bestSentence = '';
    let highestScore = 0;

    sentences.forEach((sentence, index) => {
      let score = 0;

      sentence.split(' ').forEach((word) => {
        score += tfidf.tfidf(word, index);
      });

      if (score > highestScore) {
        highestScore = score;
        bestSentence = sentence;
      }
    });

    return bestSentence;
  }

  private extractCategories(caption: string): string[] {
    const sentences = cleanCaption(caption);

    const tfidf = new TfIdf();

    sentences.forEach((sentence) => tfidf.addDocument(sentence));

    const wordScores: { [word: string]: number } = {};

    sentences.forEach((sentence, index) => {
      sentence.split(' ').forEach((word) => {
        const score = tfidf.tfidf(word, index);
        if (wordScores[word]) {
          wordScores[word] += score;
        } else {
          wordScores[word] = score;
        }
      });
    });

    const sortedWords = Object.entries(wordScores)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);

    const categories = sortedWords.slice(0, 5);

    return categories;
  }
}
