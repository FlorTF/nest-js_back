import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1715509140045 implements MigrationInterface {
    name = 'Init1715509140045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" text NOT NULL DEFAULT '["unprivileged_user"]', "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "status" text NOT NULL DEFAULT '["active"]', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "merchants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "status" text NOT NULL DEFAULT '["active"]', CONSTRAINT "PK_4fd312ef25f8e05ad47bfe7ed25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "status" text NOT NULL DEFAULT '["active"]', "roleId" uuid, "merchantId" uuid, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_368e146b785b574f42ae9e53d5" UNIQUE ("roleId"), CONSTRAINT "REL_af94df2e060180b6043d5e4504" UNIQUE ("merchantId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensedia_data_queues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payload" text NOT NULL, "reference_id" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "status" text NOT NULL DEFAULT '["active"]', "merchantId" uuid, CONSTRAINT "REL_b800d360d14c425ffcefe82f7f" UNIQUE ("merchantId"), CONSTRAINT "PK_8e96130ec2dbb50ad38268031bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_af94df2e060180b6043d5e45042" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensedia_data_queues" ADD CONSTRAINT "FK_b800d360d14c425ffcefe82f7fa" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensedia_data_queues" DROP CONSTRAINT "FK_b800d360d14c425ffcefe82f7fa"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_af94df2e060180b6043d5e45042"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`DROP TABLE "sensedia_data_queues"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "merchants"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
