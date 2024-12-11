import { Module } from '@nestjs/common';
import { UserInstagramService } from './user-instagram.service';
import { UserInstagramController } from './user-instagram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInstagram } from './entities/user-instagram.entity';
import { HttpModule } from '@nestjs/axios';
import { PostInstagramModule } from '../post-instagram/post-instagram.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInstagram]),
    HttpModule.register({
      timeout: 300000,
    }),
    PostInstagramModule,
    StorageModule,
  ],
  controllers: [UserInstagramController],
  providers: [UserInstagramService],
  exports: [UserInstagramService],
})
export class UserInstagramModule {}
