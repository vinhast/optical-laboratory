import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClientApplicationRoles1612359612000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'clients_application_roles',
    );
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'clients_application_roles',
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
        'clients_application_roles',
        new TableForeignKey({
          name: 'fk_roles_clients_application',
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
      'clients_application_roles',
    );
    if (checkIfTableExist) {
      await queryRunner.dropTable('clients_application_roles');
    }
  }
}
