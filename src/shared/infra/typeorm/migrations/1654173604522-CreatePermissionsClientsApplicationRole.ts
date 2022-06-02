import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePermissionsClientsApplicationRoles1654173604522
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'permissions_clients_application_roles',
    );
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'permissions_clients_application_roles',
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
              name: 'client_application_role_id',
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
        'permissions_clients_application_roles',
        new TableForeignKey({
          name: 'fk_permissions_clients_application_roles_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_clients_application_roles',
        new TableForeignKey({
          name: 'fk_permissions_clients_application_roles_clients_application_permissions',
          columnNames: ['client_application_permission_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application_permissions',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_clients_application_roles',
        new TableForeignKey({
          name: 'fk_permissions_clients_application_roles_clients_application_roles',
          columnNames: ['client_application_role_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application_roles',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'permissions_clients_application_roles',
    );
    if (checkIfTableExist) {
      await queryRunner.dropForeignKey(
        'permissions_clients_application_roles',
        'fk_permissions_clients_application_roles_clients_application_roles',
      );
      await queryRunner.dropForeignKey(
        'permissions_clients_application_roles',
        'fk_permissions_clients_application_roles_clients_application_permissions',
      );
      await queryRunner.dropForeignKey(
        'permissions_clients_application_roles',
        'fk_permissions_clients_application_roles_clients_application',
      );
      await queryRunner.dropTable('permissions_clients_application_roles');
    }
  }
}
