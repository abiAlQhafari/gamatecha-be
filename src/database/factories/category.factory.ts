import { setSeederFactory } from 'typeorm-extension';
import { Category } from '../../modules/categories/entities/category.entity';

export default setSeederFactory(Category, (faker) => {
  const category = new Category();
  category.name = faker.lorem.word();

  return category;
});
