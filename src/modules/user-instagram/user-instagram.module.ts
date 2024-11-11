import { Module } from '@nestjs/common';
import { UserInstagramService } from './user-instagram.service';
import { UserInstagramController } from './user-instagram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInstagram } from './entities/user-instagram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInstagram])],
  controllers: [UserInstagramController],
  providers: [UserInstagramService],
  exports: [UserInstagramService],
})
export class UserInstagramModule {}
