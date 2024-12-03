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
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PostInstagram } from '../post-instagram/entities/post-instagram.entity';

@Injectable()
export class UserInstagramService extends BaseService<
  UserInstagram,
  CreateUserInstagramDto
> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserInstagram)
    private readonly repository: Repository<UserInstagram>,
    private readonly httpService: HttpService,
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

      const scrapePosts = await firstValueFrom(
        this.httpService
          .get(
            `http://127.0.0.1:8000/api/instagram/${Array.isArray(instance) ? instance[0].username : instance.username}`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              console.error(error);
              throw error;
            }),
          ),
      );

      if (scrapePosts.status === 200) {
        await queryRunner.startTransaction();
        let postInstagrams = [];

        for (const post of scrapePosts.data) {
          const postInstagram = queryRunner.manager
            .getRepository(PostInstagram)
            .create({
              code: post.code,
              instagramId: post.id,
              instagramPk: post.pk,
              takenAt: post.taken_at || new Date(),
              caption: post.caption_text || '',
              thumbnailUrl: post.thumbnail_url,
              mediaUrl: post.video_url || post.image_url,
              postUrl: 'https://www.instagram.com/p/' + post.code,
              user: Array.isArray(instance) ? instance[0] : instance,
            });

          postInstagrams.push(postInstagram);
        }

        await this.dataSource.getRepository(PostInstagram).save(postInstagrams);
      }

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
