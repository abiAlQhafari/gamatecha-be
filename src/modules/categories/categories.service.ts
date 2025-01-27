import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from '../../common/service/base.service';
import { Category } from './entities/category.entity';
import {
  DataSource,
  EntityManager,
  QueryRunner,
  Repository,
  ILike,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadDto } from 'src/common/dto/jwt-payload.dto';

@Injectable()
export class CategoriesService extends BaseService<
  Category,
  CreateCategoryDto
> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {
    super(repository);
  }

  /*
    Default Relationship
  */
  defaultRelation() {
    return ['articles'];
  }

  async create(
    createCategoryDto: CreateCategoryDto | CreateCategoryDto[],
    user: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<Category | Category[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const instances = await super.create(
        createCategoryDto,
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

  async findAndCount(options?: any): Promise<[Category[], number]> {
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
        name: ILike(`%${search}%`), // Menyesuaikan ke field `name` untuk kategori
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

    const [result, total] = await super.findAndCount(
      {
        limit: Number(limit),
        page: Number(page),
        orderBy: orderBy,
        orderDirection: orderDirection,
      },
      findOption,
    );

    result.forEach((category: any) => {
      category.totalPost = category.articles?.length;
    });

    return [result, total];
  }

  async update(
    pathParameter: FindOptionsWhere<Category>,
    updateCategoryDto: UpdateCategoryDto,
    user: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<Category> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const category = await this.findOneByOrFail(pathParameter);

      // Update properties of the category
      Object.assign(category, updateCategoryDto);
      await queryRunner.manager.save(category);

      await queryRunner.commitTransaction();
      return category;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
