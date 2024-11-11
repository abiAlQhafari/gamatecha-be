import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  EntityManager,
  EntityNotFoundError,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Relation,
  Repository,
  UpdateResult,
} from 'typeorm';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { BaseEntity } from '../entity/base.entity';
import { QueryParameterDto } from '../dto/query-parameter.dto';
import { NotFoundException } from '../exception/types/not-found.exception';

export abstract class BaseService<TEntity extends BaseEntity, TCreate> {
  constructor(private entitiesRepository: Repository<TEntity>) {}

  /**
   * The function `handleError` logs an error message and throws an `InternalServerErrorException` with
   * a formatted error message.
   * @param {any} error - The `error` parameter is a variable that holds information about the error
   * that occurred during the execution of a specific action in the code. It can contain details such
   * as the error message, stack trace, and other relevant information related to the error.
   * @param {string} action - The `action` parameter in the `handleError` function represents the
   * action or operation that was being performed when an error occurred. It is used to provide context
   * in the error message and logging to help identify where the error occurred in the code.
   */
  private handleError(error: any, action: string): void {
    console.error(`Failed to ${action}: ${error.message}`);
    throw new InternalServerErrorException();
  }

  /**
   * This TypeScript function creates one or more entities with optional user information and entity
   * manager, handling object relations and error handling.
   * @param {TCreate | TCreate[]} createDto - The `createDto` parameter in the `create` method is used
   * to pass the data that needs to be created in the database. It can be either a single object of
   * type `TCreate` or an array of objects of type `TCreate`. This data will be used to create new
   * entities
   * @param {JwtPayloadDto} [user] - The `user` parameter in the `create` method is of type
   * `JwtPayloadDto`. It is an optional parameter that represents the user who is performing the create
   * operation. If a user is provided, their username will be used to set the `createdBy` field in the
   * entity being created.
   * @param {EntityManager} [manager] - The `manager` parameter in the `create` method is an optional
   * parameter of type `EntityManager`. It is used to specify the entity manager that will be used to
   * interact with the database. If a `manager` is provided, the method will use the repository from
   * that entity manager to perform the database
   * @returns The `create` method is returning a `Promise` that resolves to either a single `TEntity`
   * entity or an array of `TEntity` entities, depending on the input `createDto`.
   */
  async create(
    createDto: TCreate | TCreate[],
    user?: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<TEntity | TEntity[]> {
    const repo = manager
      ? manager.getRepository(this.entitiesRepository.target)
      : this.entitiesRepository;

    const _createDto: any = createDto;

    try {
      if (Array.isArray(_createDto)) {
        _createDto.forEach((dto) => {
          if (Object.keys(dto).some((key) => key.includes('id'))) {
            const relations = Object.keys(dto).filter((key) =>
              key.includes('id'),
            );
            relations.forEach((relationKey) => {
              const entityName = relationKey.split('_')[0];
              dto[entityName] = { id: dto[relationKey] };
              delete dto[relationKey];
            });
          }
          dto['createdBy'] = user?.username;
        });
      } else {
        _createDto['createdBy'] = user?.username;
        if (Object.keys(_createDto).some((key) => key.includes('_id'))) {
          const relations = Object.keys(_createDto).filter((key) =>
            key.includes('_id'),
          );
          relations.forEach((relationKey) => {
            const entityName = relationKey.split('_')[0];
            _createDto[entityName] = { id: _createDto[relationKey] };
            delete _createDto[relationKey];
          });
        }
      }

      const instance = repo.create(_createDto);

      return await repo.save(instance);
    } catch (error) {
      if (error.code == '23505') {
        throw new BadRequestException(
          `${this.entitiesRepository.metadata.name} already exists`,
        );
      }
      throw error;
    }
  }

  /**
   * This TypeScript function asynchronously finds and counts entities based on provided query
   * parameters.
   * @param {QueryParameterDto} defaultQueryParam - The `defaultQueryParam` parameter is an object of
   * type `QueryParameterDto` which contains properties for `page`, `limit`, `orderBy`, and
   * `orderDirection`. These properties are used to determine the pagination and sorting options for
   * the query.
   * @param {FindManyOptions} options - The `options` parameter in the `findAndCount` method is an
   * object that allows you to specify additional options for the database query. By default, it is an
   * empty object `{}`. You can pass various options such as `where`, `relations`, `order`, `take`,
   * `skip
   * @returns An array containing two elements is being returned. The first element is an array of
   * `TEntity` entities, and the second element is a number representing the total count of entities
   * that match the query options.
   */
  async findAndCount(
    defaultQueryParam: QueryParameterDto,
    options: FindManyOptions = {},
  ): Promise<[TEntity[], number]> {
    const { page = 1, limit = 10 } = defaultQueryParam;

    // TODO: Multiple Order
    const queryOptions: any = {
      ...options,
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [defaultQueryParam.orderBy || 'createdAt']:
          defaultQueryParam.orderDirection || 'DESC',
      },
    };

    return await this.entitiesRepository.findAndCount(queryOptions);
  }

  /**
   * This async function finds entities based on the provided options using TypeScript.
   * @param {FindManyOptions} options - The `findBy` method takes an optional parameter `options` of
   * type `FindManyOptions`. This parameter is used to specify the conditions for the query, such as
   * the `where` clause. If no options are provided, an empty object `{}` is used as the default value.
   * @returns An array of entities of type `TEntity` that match the provided options.
   */
  async findBy(options: FindManyOptions = {}): Promise<TEntity[]> {
    return await this.entitiesRepository.find(options);
  }

  /**
   * The `findOne` function retrieves a single entity by its ID with optional additional options.
   * @param {number} id - The `id` parameter is a number that is used to specify the unique identifier
   * of the entity you want to find in the database.
   * @param [options] - The `options` parameter in the `findOne` method is an optional parameter of
   * type `FindOneOptions<TEntity>`. It allows you to specify additional options for the query, such as
   * `relations`, `select`, `order`, `skip`, `take`, etc., to customize the query behavior when
   * @returns The `findOne` method is returning a Promise that resolves to an entity of type `TEntity`.
   * The method queries the `entitiesRepository` to find an entity with the specified `id` and
   * additional options provided in the `options` parameter.
   */
  async findOne(
    id: number,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    return await this.entitiesRepository.findOne({
      where: { id },
      ...(options ?? {}),
    } as any);
  }

  // TODO: ADD RELATIONS
  /**
   * The function `findOneOrFail` retrieves an entity by its ID and throws a `NotFoundException` if the
   * entity is not found.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * entity you are trying to find in the database.
   * @returns The `findOneOrFail` method returns a Promise that resolves to an entity of type `TEntity`
   * with the specified `id`. If the entity is not found, it throws a `NotFoundException` with a
   * message indicating that the entity with the given ID was not found.
   */
  async findOneOrFail(id: number): Promise<TEntity> {
    try {
      return await this.entitiesRepository.findOneOrFail({
        where: { id: id },
      } as any);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `${this.entitiesRepository.metadata.name} with ID '${id}' not found`,
        );
      }
      throw error;
    }
  }

  /**
   * This function asynchronously finds and returns a single entity based on the provided options.
   * @param {FindManyOptions} options - The `options` parameter in the `findOneBy` function is of type
   * `FindManyOptions`, which is an object that can contain various options for querying the database.
   * These options can include conditions, relations, order, limit, offset, and other criteria to
   * customize the query. By passing this `
   * @returns The `findOneBy` method is returning a Promise that resolves to a single entity of type
   * `TEntity` based on the provided options using the `entitiesRepository.findOne` method.
   */
  async findOneBy(options: FindOneOptions<TEntity>): Promise<TEntity> {
    const result = await this.entitiesRepository.findOne(options as any);
    return result;
  }

  /**
   * This function finds a single entity based on the provided options or throws a NotFoundException if
   * the entity is not found.
   * @param options - The `options` parameter in the `findOneByOrFail` method is of type
   * `FindOptionsWhere<TEntity>`. This parameter likely contains the criteria or conditions based on
   * which the entity is being searched for in the repository. It could include properties like
   * `where`, `order`, `relations`, `select
   * @returns The `findOneByOrFail` method is returning a `Promise` that resolves to an entity of type
   * `TEntity`.
   */
  async findOneByOrFail(
    options: FindOptionsWhere<TEntity>,
    relations?: FindOptionsRelations<TEntity>,
  ): Promise<TEntity> {
    try {
      const instance = await this.entitiesRepository.findOne({
        where: options,
        relations: relations,
      });
      if (!instance) {
        throw new NotFoundException(
          `${this.entitiesRepository.metadata.name} with Property '${options}' not found`,
        );
      }
      return instance;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `${this.entitiesRepository.metadata.name} with Property '${options}' not found`,
        );
      }
      throw error;
    }
  }

  /**
   * This TypeScript function updates one or more entities based on the provided ID(s) and update data,
   * with optional user information.
   * @param {number | number[]} id - The `id` parameter in the `update` function can be either a single
   * number or an array of numbers. It is used to identify the entity or entities that need to be
   * updated.
   * @param updateDto - The `updateDto` parameter in the `update` method is of type `Partial<TCreate>`,
   * which means it is an object containing partial properties of the type `TCreate`. This parameter is
   * used to provide the data that needs to be updated in the entity/entities identified by the `id`
   * @param {JwtPayloadDto} [user] - The `user` parameter in the `update` method is of type
   * `JwtPayloadDto`, which is used to pass the user information such as the username. It is an
   * optional parameter, meaning it can be provided or omitted when calling the `update` method. If
   * provided, it will be used
   * @returns The `update` method returns a Promise that resolves to either a single `TEntity` object
   * or an array of `TEntity` objects, depending on whether the `id` parameter is a single number or an
   * array of numbers.
   */
  async update(
    option: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
    updateDto: Partial<TCreate>,
    user?: JwtPayloadDto,
    manager?: EntityManager,
  ): Promise<TEntity | TEntity[]> {
    const repo = manager
      ? manager.getRepository(this.entitiesRepository.target)
      : this.entitiesRepository;

    let entities: TEntity[];

    try {
      const optionsArray = Array.isArray(option) ? option : [option];
      entities = await Promise.all(
        optionsArray.map(async (opt) =>
          repo.findOneOrFail({ where: opt } as any),
        ),
      );
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
      this.handleError(error, 'update');
    }

    const mappedDto = Array.isArray(updateDto) ? updateDto : [updateDto];
    mappedDto.forEach((dto) => {
      Object.keys(dto).forEach((key) => {
        if (key.includes('id')) {
          const entityName = key.split('_')[0];
          dto[entityName] = { id: dto[key] };
          delete dto[key];
        }
      });
    });

    const updatedEntities: TEntity[] = entities
      .map((entity, index) =>
        repo.create({
          ...entity,
          ...mappedDto[index],
          updatedBy: user?.username,
        }),
      )
      .flat();

    try {
      await repo.save(updatedEntities);

      return await this.entitiesRepository.findOne({ where: option });
    } catch (error) {
      this.handleError(error, 'update');
    }
  }

  /**
   * This TypeScript function removes entities either individually by ID or in bulk, soft deleting them
   * with the specified user information.
   * @param {number} [id] - The `id` parameter is used to specify the unique identifier of the entity
   * that you want to remove. If a valid `id` is provided, the function will soft delete the entity
   * with that specific identifier. If `id` is not provided, the function will perform a bulk soft
   * delete operation on
   * @param {JwtPayloadDto} [user] - The `user` parameter in the `remove` method is of type
   * `JwtPayloadDto`, which likely contains information about the authenticated user making the
   * request. This parameter is used to track the user who initiated the deletion operation. In the
   * code snippet provided, the `username` property of the `user
   * @returns The `remove` method returns a Promise that resolves to an `UpdateResult`.
   */
  async remove(
    option?: FindOptionsWhere<TEntity>,
    user?: JwtPayloadDto,
  ): Promise<UpdateResult> {
    try {
      const metadata = this.entitiesRepository.metadata;
      const relations = metadata.relations.map(
        (relation) => relation.propertyName,
      );

      if (option) {
        const entity = await this.entitiesRepository.findOneOrFail({
          where: option,
          relations,
        } as any);

        entity.deletedBy = user?.username;
        await this.entitiesRepository.save(entity);
        return await this.entitiesRepository.softRemove(entity as any);
      }

      /* 
        Bulk Soft Delete
      */
      const entities = await this.entitiesRepository.find({ relations });
      for (const entity of entities) {
        (entity as any).deletedBy = user?.username;
        (entity as any).deletedAt = new Date();
        await this.entitiesRepository.save(entity);
      }
      return await this.entitiesRepository.softRemove(entities as any);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  /**
   * The `exists` function in TypeScript checks if any entities matching the provided options exist in
   * the repository.
   * @param options - The `options` parameter in the `exists` method is of type
   * `FindManyOptions<TEntity>`. This type typically includes various options for finding multiple
   * entities in a repository, such as filtering criteria, sorting options, pagination settings, and
   * other parameters that define how the entities should be retrieved.
   * @returns The `exists` method is returning a Promise that resolves to a boolean value.
   */
  async exists(options: FindManyOptions<TEntity>): Promise<boolean> {
    return await this.entitiesRepository.exists(options);
  }

  /**
   * This async function counts the number of entities based on the provided options using TypeScript.
   * @param options - The `options` parameter in the `count` method is of type
   * `FindManyOptions<TEntity>`, which is used to specify the criteria for finding multiple entities in
   * the repository. It allows you to set conditions, order, skip, take, and other options for the
   * query.
   * @returns The `count` method returns a Promise that resolves to a number, which represents the
   * count of entities that match the provided options in the `entitiesRepository`.
   */
  async count(options: FindManyOptions<TEntity> = {}): Promise<number> {
    return await this.entitiesRepository.count(options);
  }
}
