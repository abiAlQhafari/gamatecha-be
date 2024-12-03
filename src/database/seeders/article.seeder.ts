import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../common/user/entities/user.entity';
import { Article } from '../../modules/articles/entities/article.entity';

export default class ArticleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "category" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "article" RESTART IDENTITY CASCADE;');
    await dataSource.query(
      'TRUNCATE "article_categories_category" RESTART IDENTITY CASCADE;',
    );

    const articleFactory = factoryManager.get(Article);

    await articleFactory.save();

    await articleFactory.saveMany(5);
  }
}
