import { Type } from 'class-transformer';

export class JwtPayloadDto {
  @Type(() => Number)
  id: number = 0;

  @Type(() => String)
  username: string = '';

  @Type(() => Boolean)
  isAdmin: boolean = false;

  @Type(() => Array)
  hasGroups: [] = [];

  @Type(() => Array)
  hasPermissions: [] = [];
}
