import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStocksMoviments1636463434006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stocks_moviments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'order_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'product_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'financial_moviment_id',
            type: 'int',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'type',
            type: 'char(1)',
          },
          {
            name: 'origin',
            type: 'varchar(2)',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'stocks_moviments',
      new TableForeignKey({
        name: 'fk_stocks_moviments_orders',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'stocks_moviments',
      new TableForeignKey({
        name: 'fk_stocks_moviments_products',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'stocks_moviments',
      new TableForeignKey({
        name: 'fk_stocks_moviments_financial_moviments',
        columnNames: ['financial_moviment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'financial_moviments',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'stocks_moviments',
      'fk_stocks_moviments_orders',
    );
    await queryRunner.dropForeignKey(
      'stocks_moviments',
      'fk_stocks_moviments_products',
    );
    await queryRunner.dropForeignKey(
      'stocks_moviments',
      'fk_stocks_moviments_financial_moviments',
    );
    await queryRunner.dropTable('stocks_moviments');
  }
}
