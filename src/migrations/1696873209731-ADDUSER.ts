import { MigrationInterface, QueryRunner } from "typeorm"

export class ADDUSER1696873209731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO user_table (username, password_hash, email, status)
        VALUES ('Chicken', '$2b$10$ZjJXVtcSOOaHFT23JyC8t.vocu4u.cqs5K2klfLmRltssANNqFLBW', 'Chicken@town.com', true);
        `);

        await queryRunner.query(`
        INSERT INTO user_role_mapping (user_id, role_id)
        SELECT 
          (SELECT user_id FROM user_table WHERE username = 'Chicken'),
          (SELECT role_id FROM role_table WHERE role_name = 'ADMIN');
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
