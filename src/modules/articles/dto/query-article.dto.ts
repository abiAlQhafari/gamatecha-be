import { ApiProperty } from '@nestjs/swagger';

export class QueryParameterArticleDto {
  @ApiProperty()
  slug: string | undefined = undefined;
}
