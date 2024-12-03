import { setSeederFactory } from 'typeorm-extension';
import { Article } from '../../modules/articles/entities/article.entity';
import { Category } from '../../modules/categories/entities/category.entity';

export default setSeederFactory(Article, (faker) => {
  const article = new Article();
  article.mediaUrl = 'https://loremflickr.com/1920/1080?random=1';
  article.title = faker.lorem.words();
  article.content = faker.lorem.paragraphs();
  article.slug = faker.lorem.slug();
  article.publishedAt = faker.date.past();

  const category1 = new Category();
  category1.name = faker.lorem.word();

  const category2 = new Category();
  category2.name = faker.lorem.word();

  article.categories = [category1, category2];
  return article;
});
