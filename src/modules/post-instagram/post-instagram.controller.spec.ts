import { Test, TestingModule } from '@nestjs/testing';
import { PostInstagramController } from './post-instagram.controller';
import { PostInstagramService } from './post-instagram.service';

describe('PostInstagramController', () => {
  let controller: PostInstagramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostInstagramController],
      providers: [PostInstagramService],
    }).compile();

    controller = module.get<PostInstagramController>(PostInstagramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
