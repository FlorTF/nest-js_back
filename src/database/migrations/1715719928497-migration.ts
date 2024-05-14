import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715719928497 implements MigrationInterface {
    name = 'Migration1715719928497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensedia_data_queues" ADD "reference_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensedia_data_queues" DROP COLUMN "reference_id"`);
    }

}
