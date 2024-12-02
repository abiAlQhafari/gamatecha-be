import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostInstagramDto {
  @IsNotEmpty()
  @IsString()
  instagramPk: string;

  @IsNotEmpty()
  @IsString()
  instagramId: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsDateString()
  takenAt: Date;

  @IsNotEmpty()
  @IsString()
  thumbnailUrl: string;

  @IsNotEmpty()
  @IsString()
  mediaUrl: string;

  @IsNotEmpty()
  @IsString()
  caption: string;

  @IsNotEmpty()
  @IsString()
  postUrl: string;

  @IsNotEmpty()
  @IsNumber()
  mediaType_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
