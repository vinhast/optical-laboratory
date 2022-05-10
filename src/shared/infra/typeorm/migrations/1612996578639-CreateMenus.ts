import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMenus1612996578639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('menus');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'menus',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'parent_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'method',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'controller',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'action',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'type',
              type: 'enum',
              enum: ['cake', 'front'],
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
        'menus',
        new TableForeignKey({
          name: 'fk_menu_sub',
          columnNames: ['parent_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'menus',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('menus');
    if (checkIfTableExist) {
      await queryRunner.dropForeignKey('menus', 'fk_menu_sub');
      await queryRunner.dropTable('menus');
    }
  }
}
