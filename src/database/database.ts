import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ConfigModule } from 'src/config/config.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

async function getConfigService() {
  const app = await NestFactory.createApplicationContext(ConfigModule);
  return app.get(ConfigService);
}

/*
It will be used for app connection to Database.
*/
export async function typeOrmConfig(): Promise<
  DataSourceOptions & SeederOptions
> {
  const configService = await getConfigService();
  return {
    type: 'postgres',
    synchronize: false,
    entities: ['dist/bases/**/*.entity{.ts,.js}', 'dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    seeds: ['dist/database/seeders/**/*{.ts,.js}'],
    factories: ['dist/database/factories/**/*{.ts,.js}'],
    // cache: true,
    // logging: true,
    replication: {
      master: {
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
      },
      slaves: [
        // {
        //   host: 'server2',
        //   port: 3306,
        //   username: 'test',
        //   password: 'test',
        //   database: 'test',
        // },
        // {
        //   host: 'server3',
        //   port: 3306,
        //   username: 'test',
        //   password: 'test',
        //   database: 'test',
        // },
      ],
    },
  };
}

async function getDataSource() {
  const dataSourceOption = await typeOrmConfig();
  return new DataSource(dataSourceOption);
}

/*
It will be used for Database migration.
*/
export const dataSource = getDataSource().then();
