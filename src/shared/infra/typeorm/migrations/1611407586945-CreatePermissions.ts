import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePermissions1611407586945
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('permissions');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'permissions',
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
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'method',
              type: 'varchar',
            },
            {
              name: 'base_url',
              type: 'varchar',
            },
            {
              name: 'path',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'description',
              type: 'varchar',
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
        'permissions',
        new TableForeignKey({
          name: 'fk_permissions_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('permissions');
    if (checkIfTableExist) {
      await queryRunner.dropTable('permissions');
    }
  }
}
