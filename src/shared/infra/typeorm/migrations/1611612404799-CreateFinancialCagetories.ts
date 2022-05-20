import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateFinancialCagetories1611612404799
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'financial_categories',
    );
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'financial_categories',
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
              name: 'parent_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'type',
              type: 'enum',
              enum: ['C', 'D'],
              isNullable: true,
            },
            {
              name: 'active',
              type: 'boolean',
              default: true,
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
        'financial_categories',
        new TableForeignKey({
          name: 'fk_financial_sub_categories',
          columnNames: ['parent_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'financial_categories',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'financial_categories',
    );
    if (checkIfTableExist) {
      await queryRunner.dropForeignKey(
        'financial_categories',
        'fk_financial_sub_categories',
      );
      await queryRunner.dropTable('financial_categories');
    }
  }
}
