import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUsers1611407470088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('users');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
            },
            {
              name: 'client_application_id',
              type: 'int',
              isPrimary: true,
            },

            {
              name: 'role_id',
              type: 'int',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'avatar',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'username',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'active',
              type: 'boolean',
              isNullable: true,
              default: true,
            },
            {
              name: 'last_acess_at',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
      );
      await queryRunner.createForeignKey(
        'users',
        new TableForeignKey({
          name: 'fk_users_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );
      await queryRunner.createForeignKey(
        'users',
        new TableForeignKey({
          name: 'fk_users_roles',
          columnNames: ['role_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'roles',
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('users');
    if (checkIfTableExist) {
      await queryRunner.dropForeignKey('users', 'fk_users_roles');
      await queryRunner.dropTable('users');
    }
  }
}
