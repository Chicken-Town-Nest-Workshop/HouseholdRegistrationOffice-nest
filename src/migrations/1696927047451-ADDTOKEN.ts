import { MigrationInterface, QueryRunner } from "typeorm"

export class ADDTOKEN1696927047451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE token_table
        ADD COLUMN one_time_token UUID NOT NULL DEFAULT uuid_generate_v4(),
        ADD COLUMN one_time_token_disable BOOLEAN NOT NULL
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
