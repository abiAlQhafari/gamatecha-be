import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserInstagram1731332703159 implements MigrationInterface {
    name = 'CreateUserInstagram1731332703159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_instagram" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "username" character varying NOT NULL, CONSTRAINT "PK_1d4137ab8dc72a6269a6559fc61" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_instagram"`);
    }

}
