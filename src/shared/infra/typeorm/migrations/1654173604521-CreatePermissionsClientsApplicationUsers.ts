import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePermissionsClientsApplicationUsers1654173604521
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'permissions_clients_application_users',
    );
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'permissions_clients_application_users',
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
              name: 'client_application_permission_id',
              type: 'int',
            },
            {
              name: 'client_application_user_id',
              type: 'int',
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
        'permissions_clients_application_users',
        new TableForeignKey({
          name: 'fk_permissions_clients_application_users_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_clients_application_users',
        new TableForeignKey({
          name: 'fk_permissions_clients_application_users__clients_application_permissions',
          columnNames: ['client_application_permission_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application_permissions',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_clients_application_users',
        new TableForeignKey({
          name: 'fk_permissions_clients_application_users_clients_applications_users',
          columnNames: ['client_application_user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_applications_users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'permissions_clients_application_users',
    );
    if (checkIfTableExist) {
      await queryRunner.dropForeignKey(
        'permissions_clients_application_users',
        'fk_permissions_clients_application_users_clients_applications_users',
      );
      await queryRunner.dropForeignKey(
        'permissions_clients_application_users',
        'fk_permissions_clients_application_users__clients_application_permissions',
      );
      await queryRunner.dropForeignKey(
        'permissions_clients_application_users',
        'fk_permissions_clients_application_users_clients_application',
      );
      await queryRunner.dropTable('permissions_clients_application_users');
    }
  }
}
