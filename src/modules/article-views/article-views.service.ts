import { Injectable } from '@nestjs/common';
import { CreateArticleViewDto } from './dto/create-article-view.dto';
import { UpdateArticleViewDto } from './dto/update-article-view.dto';
import { BaseService } from '../../common/service/base.service';
import { ArticleView } from './entities/article-view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';

@Injectable()
export class ArticleViewsService extends BaseService<
  ArticleView,
  CreateArticleViewDto
> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ArticleView)
    private readonly repository: Repository<ArticleView>,
  ) {
    super(repository);
  }

  /* 
    Default Relationship
  */
  private defaultRelation() {
    return [];
  }

  async create(
    createDto: CreateArticleViewDto | CreateArticleViewDto[],
    user?: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<ArticleView | ArticleView[]> {
    let queryRunner: QueryRunner | null = null;
    let useTransaction = false;

    if (!manager) {
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      manager = queryRunner.manager;
      useTransaction = true;
    }

    try {
      const instances = await super.create(
        createDto,
        user,
        queryRunner.manager,
      );

      if (useTransaction) {
        await queryRunner.commitTransaction();
      }

      return instances;
    } catch (error) {
      if (useTransaction && queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      if (useTransaction && queryRunner) {
        await queryRunner.release();
      }
    }
  }
}
