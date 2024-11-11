import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../common/user/entities/user.entity';

@Injectable()
export class SeedersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seedBaseData() {
    // Seed User
    const users: Partial<User>[] = [
      this.userRepository.create({
        email: 'admin@admin.com',
        username: 'superadmin',
        password: 'superadmin@123',
        isAdmin: true,
      }),
    ];
    for (const user of users) {
      const userExist = await this.userRepository.findOne({
        where: { username: user.username },
      });
      if (!userExist) {
        await this.userRepository.save(user);
      }
    }
  }
}
