import { Module } from '@nestjs/common';
import { PostInstagramService } from './post-instagram.service';
import { PostInstagramController } from './post-instagram.controller';

@Module({
  controllers: [PostInstagramController],
  providers: [PostInstagramService],
})
export class PostInstagramModule {}
