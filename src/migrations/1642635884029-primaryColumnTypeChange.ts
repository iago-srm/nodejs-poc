import {MigrationInterface, QueryRunner} from "typeorm";

export class primaryColumnTypeChange1642635884029 implements MigrationInterface {
    name = 'primaryColumnTypeChange1642635884029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "PK_133ec679a801fab5e070f73d3ea"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP CONSTRAINT "FK_7fac278e61eddd24a215e8bdf7c"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP CONSTRAINT "PK_bb4f983020f59696f40ea04d6a8"`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD CONSTRAINT "PK_bb4f983020f59696f40ea04d6a8" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD CONSTRAINT "FK_7fac278e61eddd24a215e8bdf7c" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartItems" DROP CONSTRAINT "FK_7fac278e61eddd24a215e8bdf7c"`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP CONSTRAINT "PK_bb4f983020f59696f40ea04d6a8"`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD CONSTRAINT "PK_bb4f983020f59696f40ea04d6a8" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD CONSTRAINT "FK_7fac278e61eddd24a215e8bdf7c" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "PK_133ec679a801fab5e070f73d3ea"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")`);
    }

}
