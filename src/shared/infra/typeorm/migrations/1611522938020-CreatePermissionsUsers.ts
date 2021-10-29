import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePermissionsUsers1611522938020
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('permissions_users');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'permissions_users',
          columns: [
            {
              name: 'permission_id',
              type: 'int',
            },
            {
              name: 'user_id',
              type: 'int',
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_users',
        new TableForeignKey({
          name: 'fk_permissions_users',
          columnNames: ['permission_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'permissions',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'permissions_users',
        new TableForeignKey({
          name: 'fk_users_permissions',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('permissions_users');
    if (!checkIfTableExist) {
      await queryRunner.dropForeignKey(
        'permissions_users',
        'fk_permissions_users',
      );
      await queryRunner.dropForeignKey(
        'permissions_users',
        'fk_users_permissions',
      );
      await queryRunner.dropTable('permissions_users');
    }
  }
}
