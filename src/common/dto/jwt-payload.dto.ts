import { Type } from 'class-transformer';

export class JwtPayloadDto {
  @Type(() => Number)
  id: number;

  @Type(() => String)
  username: string;

  @Type(() => Boolean)
  isAdmin: boolean;

  @Type(() => Array)
  hasGroups: [];

  @Type(() => Array)
  hasPermissions: [];
}
