import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableFalseUserPostInstagram1734291905188 implements MigrationInterface {
    name = 'NullableFalseUserPostInstagram1734291905188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_instagram" DROP CONSTRAINT "FK_4ae70f3ffe37d49481dfbf8f6af"`);
        await queryRunner.query(`ALTER TABLE "post_instagram" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_instagram" ADD CONSTRAINT "FK_4ae70f3ffe37d49481dfbf8f6af" FOREIGN KEY ("userId") REFERENCES "user_instagram"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_instagram" DROP CONSTRAINT "FK_4ae70f3ffe37d49481dfbf8f6af"`);
        await queryRunner.query(`ALTER TABLE "post_instagram" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_instagram" ADD CONSTRAINT "FK_4ae70f3ffe37d49481dfbf8f6af" FOREIGN KEY ("userId") REFERENCES "user_instagram"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
