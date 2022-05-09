import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePermissionsRoles1611522883147
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('permissions_roles');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'permissions_roles',
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
              name: 'permission_id',
              type: 'int',
            },
            {
              name: 'role_id',
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
        'permissions_roles',
        new TableForeignKey({
          name: 'fk_permissions_roles_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_roles',
        new TableForeignKey({
          name: 'fk_permissions_roles',
          columnNames: ['permission_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'permissions',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_roles',
        new TableForeignKey({
          name: 'fk_roles_permissions',
          columnNames: ['role_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'roles',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('permissions_roles');
    if (!checkIfTableExist) {
      await queryRunner.dropForeignKey(
        'permissions_roles',
        'fk_permissions_roles',
      );
      await queryRunner.dropForeignKey(
        'permissions_roles',
        'fk_roles_permissions',
      );
      await queryRunner.dropTable('permissions_roles');
    }
  }
}
