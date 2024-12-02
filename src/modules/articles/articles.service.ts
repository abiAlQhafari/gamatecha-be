import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { BaseService } from '../../common/service/base.service';
import { Article } from './entities/article.entity';
import {
  DataSource,
  EntityManager,
  QueryRunner,
  Repository,
  ILike,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadDto } from 'src/common/dto/jwt-payload.dto';

@Injectable()
export class ArticleService extends BaseService<Article, CreateArticleDto> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {
    super(repository);
  }

  /*
    Default Relationship
  */
  defaultRelation() {
    return [];
  }

  async create(
    createArticleDto: CreateArticleDto | CreateArticleDto[],
    user: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<Article | Article[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const instances = await super.create(
        createArticleDto,
        user,
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();
      return instances;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAndCount(options?: any): Promise<[Article[], number]> {
    const {
      limit = 10,
      page = 1,
      orderBy,
      orderDirection,
      search,
      ...query
    } = options || {};

    const findOption: any = {};
    findOption.where = [];

    /*
      Search
    */
    if (search) {
      findOption.where.push({
        title: ILike(`%${search}%`),
      });
    }

    /*
      Filtering
    */
    Object.entries(query).forEach(([key, value]) => {
      const condition: any = {};
      if (key.includes('_')) {
        const [relationName, relationKey] = key.split('_');
        condition[relationName] = { [relationKey]: value };
        findOption.where.push(condition);
      } else {
        condition[key] = value;
        findOption.where.push(condition);
      }
    });

    findOption.relations = findOption.relations || this.defaultRelation();

    return await super.findAndCount(
      {
        limit: Number(limit),
        page: Number(page),
        orderBy: orderBy,
        orderDirection: orderDirection,
      },
      findOption,
    );
  }

  async update(
    pathParameter: FindOptionsWhere<Article>,
    updateArticleDto: UpdateArticleDto,
    user: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<Article> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const article = await this.findOneByOrFail(pathParameter);

      // Update properties of the article
      Object.assign(article, updateArticleDto);
      await queryRunner.manager.save(article);

      await queryRunner.commitTransaction();
      return article;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
