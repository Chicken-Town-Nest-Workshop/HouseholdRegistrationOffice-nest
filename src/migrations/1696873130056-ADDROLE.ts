import { MigrationInterface, QueryRunner } from "typeorm"

export class ADDROLE1696873130056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO role_table (role_name)
        VALUES ('ADMIN'), ('MANAGER'), ('USER');
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
