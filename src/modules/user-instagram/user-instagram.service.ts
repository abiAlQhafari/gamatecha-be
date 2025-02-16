import { Inject, Injectable, Post } from '@nestjs/common';
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
import { StorageService } from '../storage/storage.service';
import { Readable } from 'stream';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

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
    private readonly storageService: StorageService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    super(repository);
  }

  /*
    Default Relationship
  */
  defaultRelation() {
    return ['postInstagram'];
  }

  async create(
    createUserInstagramDto: CreateUserInstagramDto | CreateUserInstagramDto[],
    user: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<any> {
    this.logger.log(
      `SCRAPE USER INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
      UserInstagramService.name,
    );

    this.logger.log(
      `CHECK USER INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
      UserInstagramService.name,
    );

    let userInstagramInstance = await this.repository.findOne({
      where: {
        username: Array.isArray(createUserInstagramDto)
          ? createUserInstagramDto[0].username
          : createUserInstagramDto.username,
      },
      relations: ['postInstagram'],
    });

    const scrapePosts = await firstValueFrom(
      this.httpService
        .get(
          `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
          {
            headers: {
              'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
              'x-rapidapi-key': this.configService.get('RAPID_API_KEY'),
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error('Error scraping user instagram', error);
            throw error;
          }),
        ),
    );

    if (scrapePosts.status === 200) {
      let profilePictureUrl = '';

      if (!userInstagramInstance) {
        this.logger.log(
          `CREATE USER INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
          UserInstagramService.name,
        );

        this.logger.log(
          `DOWNLOAD PROFILE PICTURE USER INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
          UserInstagramService.name,
        );
        // Create UserInstagram
        const profilePictureResponse = await this.httpService.axiosRef({
          method: 'get',
          url: scrapePosts.data.data.user.profile_pic_url,
          responseType: 'arraybuffer',
        });

        const profilePictureFile: Express.Multer.File = {
          fieldname: 'file',
          originalname: `profile-picture-${scrapePosts.data.data.user.username}.jpg`,
          encoding: '7bit',
          mimetype: profilePictureResponse.headers['content-type'],
          size: Buffer.byteLength(profilePictureResponse.data),
          buffer: Buffer.from(profilePictureResponse.data),
          stream: Readable.from(profilePictureResponse.data),
          destination: '',
          path: '',
          filename: '',
        };

        this.logger.log(
          `UPLOAD PROFILE PICTURE USER INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
          UserInstagramService.name,
        );

        console.log('profilePictureResponse', profilePictureResponse);

        console.log('profilePictureFile', profilePictureFile);

        profilePictureUrl = await this.storageService.uploadFile(
          profilePictureFile,
          'public-read',
        );
      } else {
        profilePictureUrl = userInstagramInstance.profilePic;
      }

      let postInstagrams: Partial<PostInstagram>[] = [];

      for (const post of scrapePosts.data.data.items) {
        this.logger.log(
          `CHECK POST INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username} - ${post.code}`,
          UserInstagramService.name,
        );

        const postInstagramInstance = await this.dataSource
          .getRepository(PostInstagram)
          .findOne({
            where: {
              code: post.code,
            },
          });

        if (postInstagramInstance) {
          this.logger.log(
            `POST INSTAGRAM ALREADY EXIST: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username} - ${post.code}`,
            UserInstagramService.name,
          );
          continue;
        }

        this.logger.log(
          `SCRAPE POST INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username} - ${post.code}`,
          UserInstagramService.name,
        );
        this.logger.log(
          `DOWNLOAD THUMBNAIL POST INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username} - ${post.code}`,
          UserInstagramService.name,
        );
        const thumbnailPostUrl =
          post.thumbnail_url !== 'None'
            ? post.thumbnail_url
            : post.resources[0].thumbnail_url;

        const thumbnailResponse = await this.httpService
          .axiosRef({
            method: 'get',
            url: thumbnailPostUrl,
            responseType: 'arraybuffer',
          })
          .catch((error: AxiosError) => {
            this.logger.error(
              `ERROR DOWNLOAD THUMBNAIL POST: ${post.code}`,
              error,
            );
            throw error;
          });

        const thumbnailFile: Express.Multer.File = {
          fieldname: 'file',
          originalname: `thumbnail-${post.code}.jpg`,
          encoding: '7bit',
          mimetype: thumbnailResponse.headers['content-type'],
          size: Buffer.byteLength(thumbnailResponse.data),
          buffer: Buffer.from(thumbnailResponse.data),
          stream: Readable.from(thumbnailResponse.data),
          destination: '',
          filename: '',
          path: '',
        };

        const thumbnailUrl = await this.storageService.uploadFile(
          thumbnailFile,
          'public-read',
        );

        this.logger.log(
          `CREATE POST INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username} - ${post.code}`,
          UserInstagramService.name,
        );

        const caption = post.caption_text
          ? post.caption_text
          : post.caption?.text
            ? post.caption?.text
            : '';
        const postInstagram: Partial<PostInstagram> = {
          code: post.code,
          instagramId: post.id,
          instagramPk: post.pk ? post.pk : post.id,
          takenAt:
            typeof post.taken_at === 'number' && post.taken_at > 0
              ? new Date(post.taken_at * 1000)
              : typeof post.taken_at === 'string' &&
                  !isNaN(Date.parse(post.taken_at))
                ? new Date(post.taken_at)
                : new Date(),
          caption: caption,
          thumbnailUrl: thumbnailUrl,
          mediaUrl: thumbnailUrl,
          postUrl: 'https://www.instagram.com/p/' + post.code,
        };

        postInstagrams.push(postInstagram);
      }

      await this.dataSource.transaction(async (manager) => {
        if (userInstagramInstance) {
          this.logger.log(
            `UPDATE USER INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
            UserInstagramService.name,
          );
          const updatedUser = await manager.getRepository(UserInstagram).save({
            ...userInstagramInstance,
            profilePic: profilePictureUrl,
          });

          if (postInstagrams.length === 0) {
            return;
          }

          this.logger.log(
            `INSERT POST INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
            UserInstagramService.name,
          );

          await manager.getRepository(PostInstagram).save(
            postInstagrams.map((post) => ({
              ...post,
              user: {
                id: updatedUser.id,
              },
            })),
          );
        } else {
          this.logger.log(
            `INSERT USER INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
            UserInstagramService.name,
          );
          userInstagramInstance = await manager
            .getRepository(UserInstagram)
            .save({
              ...createUserInstagramDto,
              profilePic: profilePictureUrl,
              postInstagram: postInstagrams,
            });

          this.logger.log(
            `INSERT POST INSTAGRAM: ${Array.isArray(createUserInstagramDto) ? createUserInstagramDto[0].username : createUserInstagramDto.username}`,
            UserInstagramService.name,
          );

          await manager.getRepository(PostInstagram).save(
            postInstagrams.map((post) => ({
              ...post,
              user: userInstagramInstance,
            })),
          );
        }
      });

      this.logger.log('DONE SCRAPE USER INSTAGRAM', UserInstagramService.name);

      const result = await this.repository.findOne({
        where: {
          username: userInstagramInstance?.username,
        },
        relations: ['postInstagram'],
      });

      const _result: any = {
        ...result,
        totalPost: result?.postInstagram?.length,
      };

      delete _result.postInstagram;

      return _result;
    } else {
      throw new NotFoundException('User instagram not found');
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

    const [result, total] = await super.findAndCount(
      {
        limit: Number(limit),
        page: Number(page),
        orderBy: orderBy,
        orderDirection: orderDirection,
      },
      findOption,
    );

    result.forEach((user: any) => {
      user.totalPost = user.postInstagram.length;
      delete user.postInstagram;
    });

    return [result, total];
  }
}
