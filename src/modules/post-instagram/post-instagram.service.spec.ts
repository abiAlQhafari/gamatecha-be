import { Test, TestingModule } from '@nestjs/testing';
import { PostInstagramService } from './post-instagram.service';

describe('PostInstagramService', () => {
  let service: PostInstagramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostInstagramService],
    }).compile();

    service = module.get<PostInstagramService>(PostInstagramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
