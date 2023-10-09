import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class HouseholdRegistrationOffice1696859141483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'application_table',
            columns: [
                {
                    name: 'app_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'app_name',
                    type: 'varchar(100)',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'redirect_url',
                    type: 'varchar(255)',
                    isNullable: false,
                },
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'audit_log',
            columns: [
                {
                    name: 'log_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'action',
                    type: 'varchar(100)',
                    isNullable: false,
                },
                {
                    name: 'timestamp',
                    type: 'timestamp without time zone',
                    isNullable: false,
                },
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'permissions_table',
            columns: [
                {
                    name: 'permission_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'permission_name',
                    type: 'varchar(100)',
                    isUnique: true,
                    isNullable: false,
                }
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'role_permission_mapping',
            columns: [
                {
                    name: 'mapping_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'permission_id',
                    type: 'int',
                },
                {
                    name: 'role_id',
                    type: 'uuid',
                }
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'role_table',
            columns: [
                {
                    name: 'role_id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'role_name',
                    type: 'varchar(50)',
                    isNullable: false,
                }
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'session_table',
            columns: [
                {
                    name: 'session_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'start_time',
                    type: 'timestamp without time zone',
                    isNullable: false,
                },
                {
                    name: 'expiration_time',
                    type: 'timestamp without time zone',
                    isNullable: false,
                },
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'token_table',
            columns: [
                {
                    name: 'token_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'token_type',
                    type: 'varchar(50)',
                    isNullable: false,
                },
                {
                    name: 'token_value',
                    type: 'varchar(255)',
                    isNullable: false,
                },
                {
                    name: 'expiration_time',
                    type: 'timestamp without time zone',
                    isNullable: false,
                },
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'user_app_mapping',
            columns: [
                {
                    name: 'mapping_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'app_id',
                    type: 'uuid',
                }
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'user_role_mapping',
            columns: [
                {
                    name: 'mapping_id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'role_id',
                    type: 'uuid',
                }
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'user_table',
            columns: [
                {
                    name: 'user_id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'username',
                    type: 'varchar(50)',
                    isNullable: false,
                },
                {
                    name: 'password_hash',
                    type: 'varchar(100)',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar(100)',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: true,
                },
            ],
        }));

        await queryRunner.createForeignKey('audit_log', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user_table',
            referencedColumnNames: ['user_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('role_permission_mapping', new TableForeignKey({
            columnNames: ['role_id'],
            referencedTableName: 'role_table',
            referencedColumnNames: ['role_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('role_permission_mapping', new TableForeignKey({
            columnNames: ['permission_id'],
            referencedTableName: 'permissions_table',
            referencedColumnNames: ['permission_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('session_table', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user_table',
            referencedColumnNames: ['user_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('token_table', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user_table',
            referencedColumnNames: ['user_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('user_app_mapping', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user_table',
            referencedColumnNames: ['user_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('application_table', new TableForeignKey({
            columnNames: ['app_id'],
            referencedTableName: 'application_table',
            referencedColumnNames: ['app_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('user_role_mapping', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'user_table',
            referencedColumnNames: ['user_id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('user_role_mapping', new TableForeignKey({
            columnNames: ['role_id'],
            referencedTableName: 'role_table',
            referencedColumnNames: ['role_id'],
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("HouseholdRegistrationOffice", true, true, true);
    }

}
