import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timeout } from 'rxjs';
import slugify from 'slugify';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private spaceEndpoint: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.spaceEndpoint = this.configService.get<string>('SPACE_ENDPOINT') || '';
    this.s3Client = new S3Client({
      region: 'ap-southeast-1',
      endpoint: this.spaceEndpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId:
          this.configService.get<string>('SPACE_ACCESS_KEY_ID') || '',
        secretAccessKey:
          this.configService.get<string>('SPACE_SECRET_ACCESS_KEY') || '',
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    acl?: ObjectCannedACL,
  ): Promise<string> {
    const bucket = this.configService.get<string>('SPACE_BUCKET');
    const key = `media/${Math.floor(Date.now() / 1000)}_${slugify(file.originalname)}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: acl,
    });

    try {
      await this.s3Client.send(command);
      const endpoint = this.spaceEndpoint;
      return `${endpoint}/${bucket}/${key}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}
