import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleViewDto {
  @IsNotEmpty()
  @IsNumber()
  article_id: number;

  @IsNotEmpty()
  @IsString()
  ipAddr: string;

  @IsNotEmpty()
  userAgent: string;
}
