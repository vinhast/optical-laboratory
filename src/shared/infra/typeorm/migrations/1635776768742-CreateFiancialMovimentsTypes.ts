import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFiancialMovimentsTypes1635776768742
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'financial_moviments_types',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'financial_moviment_type_group_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar(100)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('financial_moviments_types');
  }
}
