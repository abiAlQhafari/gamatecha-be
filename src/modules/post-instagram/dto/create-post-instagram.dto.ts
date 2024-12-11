import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostInstagramDto {
  @IsNotEmpty()
  @IsString()
  instagramPk: string | null = null;

  @IsNotEmpty()
  @IsString()
  instagramId: string | null = null;

  @IsNotEmpty()
  @IsString()
  code: string | null = null;

  @IsNotEmpty()
  @IsDateString()
  takenAt: Date | null = null;

  @IsNotEmpty()
  @IsString()
  thumbnailUrl: string | null = null;

  @IsNotEmpty()
  @IsString()
  mediaUrl: string | null = null;

  @IsNotEmpty()
  @IsString()
  caption: string | null = null;

  @IsNotEmpty()
  @IsString()
  postUrl: string | null = null;

  @IsNotEmpty()
  @IsNumber()
  mediaType_id: number | null = null;

  @IsNotEmpty()
  @IsNumber()
  user_id: number | null = null;
}
