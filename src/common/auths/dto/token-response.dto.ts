import { Expose } from 'class-transformer';
import { TokenPayload } from '../token-payload.interface';
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto implements TokenPayload {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  isAdmin?: boolean;
}
