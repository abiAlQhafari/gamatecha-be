import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfilePictureUserInstagram1733919312467
  implements MigrationInterface
{
  name = 'AddProfilePictureUserInstagram1733919312467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_instagram" ADD "profilePic" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_instagram" DROP COLUMN "profilePic"`,
    );
  }
}
