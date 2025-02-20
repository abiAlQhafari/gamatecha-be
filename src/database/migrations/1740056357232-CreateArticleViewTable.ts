import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticleViewTable1740056357232 implements MigrationInterface {
  name = 'CreateArticleViewTable1740056357232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article_view" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "ipAddr" character varying NOT NULL, "userAgent" character varying NOT NULL, "articleId" integer, CONSTRAINT "PK_355e7dc8a18678dd0eb4604ff87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a15a38c1215e67011702d83d5d" ON "article_view" ("articleId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4df71e571d33e8f78090bc2bd1" ON "article_view" ("ipAddr", "userAgent") `,
    );
    await queryRunner.query(
      `ALTER TABLE "article_view" ADD CONSTRAINT "FK_a15a38c1215e67011702d83d5db" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article_view" DROP CONSTRAINT "FK_a15a38c1215e67011702d83d5db"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4df71e571d33e8f78090bc2bd1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a15a38c1215e67011702d83d5d"`,
    );
    await queryRunner.query(`DROP TABLE "article_view"`);
  }
}
