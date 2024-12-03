import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationArticlesCategories1733137355969 implements MigrationInterface {
    name = 'AddRelationArticlesCategories1733137355969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article_categories_category" ("articleId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_a8116c8896d1d576d6ea7ad0d3c" PRIMARY KEY ("articleId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4ba35bcb36b2715f61faa696c7" ON "article_categories_category" ("articleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d9199768aa2bd9f91d175dc6d" ON "article_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "article_categories_category" ADD CONSTRAINT "FK_4ba35bcb36b2715f61faa696c7e" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_categories_category" ADD CONSTRAINT "FK_5d9199768aa2bd9f91d175dc6d1" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_categories_category" DROP CONSTRAINT "FK_5d9199768aa2bd9f91d175dc6d1"`);
        await queryRunner.query(`ALTER TABLE "article_categories_category" DROP CONSTRAINT "FK_4ba35bcb36b2715f61faa696c7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d9199768aa2bd9f91d175dc6d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ba35bcb36b2715f61faa696c7"`);
        await queryRunner.query(`DROP TABLE "article_categories_category"`);
    }

}
