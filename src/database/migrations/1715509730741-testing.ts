import { MigrationInterface, QueryRunner } from "typeorm";

export class Testing1715509730741 implements MigrationInterface {
    name = 'Testing1715509730741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchants" ADD "status" text NOT NULL DEFAULT '["active"]'`);
        await queryRunner.query(`ALTER TABLE "merchants" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "merchants" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "merchants" ADD "name" character varying NOT NULL`);
    }

}
