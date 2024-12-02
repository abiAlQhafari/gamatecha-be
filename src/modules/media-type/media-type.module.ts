import { Module } from '@nestjs/common';
import { MediaTypeService } from './media-type.service';
import { MediaTypeController } from './media-type.controller';

@Module({
  controllers: [MediaTypeController],
  providers: [MediaTypeService],
})
export class MediaTypeModule {}
