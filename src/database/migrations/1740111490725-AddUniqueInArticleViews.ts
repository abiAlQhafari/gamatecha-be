import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueInArticleViews1740111490725
  implements MigrationInterface
{
  name = 'AddUniqueInArticleViews1740111490725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4df71e571d33e8f78090bc2bd1"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0680532d8f8d97ba8b2d8acca6" ON "article_view" ("ipAddr", "userAgent", "articleId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0680532d8f8d97ba8b2d8acca6"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4df71e571d33e8f78090bc2bd1" ON "article_view" ("ipAddr", "userAgent") `,
    );
  }
}
