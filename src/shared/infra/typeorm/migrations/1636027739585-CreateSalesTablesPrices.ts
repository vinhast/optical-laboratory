import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSalesTablesPrices1636027739585
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales_tables_prices',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_category_id',
            type: 'int',
          },
          {
            name: 'table_id',
            type: 'int',
          },
          {
            name: 'unit_price',
            type: 'varchar(10)',
          },
          {
            name: 'wholesale_price',
            type: 'varchar(10)',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales_tables_prices');
  }
}
