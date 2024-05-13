import { MigrationInterface, QueryRunner } from "typeorm";

export class Referenceid1715637978683 implements MigrationInterface {
    name = 'Referenceid1715637978683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensedia_data_queues" DROP COLUMN "reference_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensedia_data_queues" ADD "reference_id" character varying NOT NULL`);
    }

}
