import { Module } from '@nestjs/common';
import { PostInstagramService } from './post-instagram.service';
import { PostInstagramController } from './post-instagram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostInstagram } from './entities/post-instagram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostInstagram])],
  controllers: [PostInstagramController],
  providers: [PostInstagramService],
  exports: [PostInstagramService],
})
export class PostInstagramModule {}
