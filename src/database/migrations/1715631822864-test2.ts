import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21715631822864 implements MigrationInterface {
    name = 'Test21715631822864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchants" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchants" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "merchants" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "merchants" ADD "status" text NOT NULL DEFAULT '["active"]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "name"`);
    }

}
