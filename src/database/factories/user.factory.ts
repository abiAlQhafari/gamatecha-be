// src/db/factories/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../common/user/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  const sexFlag = faker.number.int(1);
  const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

  user.username = `${faker.person.firstName(sex)}${faker.person.lastName(sex)}`;
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.isAdmin = true;

  return user;
});
