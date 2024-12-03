import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1733137197708 implements MigrationInterface {
    name = 'Initialize1733137197708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "name" character varying NOT NULL, CONSTRAINT "PK_42a5f58b69908435e57eac82216" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_instagram" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "username" character varying NOT NULL, CONSTRAINT "PK_1d4137ab8dc72a6269a6559fc61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "title" character varying NOT NULL, "slug" character varying NOT NULL, "mediaUrl" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'ARCHIVED', "content" character varying NOT NULL, "publishedAt" TIMESTAMP WITH TIME ZONE, "postInstagramId" integer, CONSTRAINT "REL_601b37ba5e2b18b2ebfccd0a47" UNIQUE ("postInstagramId"), CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_instagram" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "instagramPk" character varying NOT NULL, "instagramId" character varying NOT NULL, "code" character varying NOT NULL, "takenAt" TIMESTAMP NOT NULL, "thumbnailUrl" character varying NOT NULL, "mediaUrl" character varying NOT NULL, "caption" character varying NOT NULL, "postUrl" character varying NOT NULL, "mediaTypeId" integer, "userId" integer, CONSTRAINT "UQ_3858869f600cd7392bb19e0db6c" UNIQUE ("instagramPk"), CONSTRAINT "UQ_6dd5223c867e909a7be507950b3" UNIQUE ("instagramId"), CONSTRAINT "UQ_6ee5bb70c21189dc81e85d77ac6" UNIQUE ("code"), CONSTRAINT "PK_75a1c3b4ecdc745a58d13e34d47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "username" character varying NOT NULL, "email" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cac403d64a7213535330318403" ON "users" ("id", "username", "email") WHERE "deletedAt" IS NULL AND "deletedBy" IS NULL`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_601b37ba5e2b18b2ebfccd0a470" FOREIGN KEY ("postInstagramId") REFERENCES "post_instagram"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_instagram" ADD CONSTRAINT "FK_e08dc5cb211a6a8e872765a12ba" FOREIGN KEY ("mediaTypeId") REFERENCES "media_type"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_instagram" ADD CONSTRAINT "FK_4ae70f3ffe37d49481dfbf8f6af" FOREIGN KEY ("userId") REFERENCES "user_instagram"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_instagram" DROP CONSTRAINT "FK_4ae70f3ffe37d49481dfbf8f6af"`);
        await queryRunner.query(`ALTER TABLE "post_instagram" DROP CONSTRAINT "FK_e08dc5cb211a6a8e872765a12ba"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_601b37ba5e2b18b2ebfccd0a470"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cac403d64a7213535330318403"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "post_instagram"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "user_instagram"`);
        await queryRunner.query(`DROP TABLE "media_type"`);
    }

}
