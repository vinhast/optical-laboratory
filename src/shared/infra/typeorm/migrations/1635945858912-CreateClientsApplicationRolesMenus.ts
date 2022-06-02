import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClientsApplicationRolesMenus1635945858912
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients_application_roles_menus',
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
            name: 'client_application_role_id',
            type: 'int',
          },
          {
            name: 'menu_id',
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
      'clients_application_roles_menus',
      new TableForeignKey({
        name: 'fk_clients_application_roles_menus_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'clients_application_roles_menus',
      new TableForeignKey({
        name: 'fk_clients_application_roles_menus_menus',
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'menus',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'clients_application_roles_menus',
      'fk_clients_application_roles_menus_menus',
    );
    await queryRunner.dropForeignKey(
      'clients_application_roles_menus',
      'fk_clients_application_roles_menus_clients_application',
    );
    await queryRunner.dropTable('clients_application_roles_menus');
  }
}
