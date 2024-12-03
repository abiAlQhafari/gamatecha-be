import { Module } from '@nestjs/common';
import { UserInstagramService } from './user-instagram.service';
import { UserInstagramController } from './user-instagram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInstagram } from './entities/user-instagram.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInstagram]),
    HttpModule.register({
      timeout: 300000,
    }),
  ],
  controllers: [UserInstagramController],
  providers: [UserInstagramService],
  exports: [UserInstagramService],
})
export class UserInstagramModule {}
