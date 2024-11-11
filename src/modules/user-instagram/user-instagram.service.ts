import { Injectable } from '@nestjs/common';
import { CreateUserInstagramDto } from './dto/create-user-instagram.dto';
import { BaseService } from '../../common/service/base.service';
import { UserInstagram } from './entities/user-instagram.entity';
import {
  DataSource,
  EntityManager,
  ILike,
  QueryRunner,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadDto } from 'src/common/dto/jwt-payload.dto';

@Injectable()
export class UserInstagramService extends BaseService<
  UserInstagram,
  CreateUserInstagramDto
> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserInstagram)
    private readonly repository: Repository<UserInstagram>,
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
    createUserInstagramDto: CreateUserInstagramDto | CreateUserInstagramDto[],
    user: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<UserInstagram | UserInstagram[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const instance = await super.create(
        createUserInstagramDto,
        user,
        queryRunner.manager,
      );

      await queryRunner.commitTransaction();
      return instance;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAndCount(options?: any): Promise<[UserInstagram[], number]> {
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
        username: ILike(`%${search}%`),
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
}
