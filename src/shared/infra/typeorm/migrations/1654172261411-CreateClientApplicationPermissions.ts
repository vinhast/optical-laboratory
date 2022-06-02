import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClientApplicationPermissions1654172261411
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'clients_application_permissions',
    );
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'clients_application_permissions',
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
        'clients_application_permissions',
        new TableForeignKey({
          name: 'fk_clients_application_permissions_clients_application',
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
    const checkIfTableExist = await queryRunner.hasTable(
      'clients_application_permissions',
    );
    if (checkIfTableExist) {
      await queryRunner.dropTable('clients_application_permissions');
    }
  }
}
