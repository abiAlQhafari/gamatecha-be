import { Expose } from 'class-transformer';
import { TokenPayload } from '../token-payload.interface';
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto implements TokenPayload {
  @Expose()
  @ApiProperty()
  id: number | null = null;

  @Expose()
  @ApiProperty()
  username: string | null = null;

  @Expose()
  @ApiProperty()
  isAdmin?: boolean | null = null;
}
