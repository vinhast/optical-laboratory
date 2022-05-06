import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFinancialMovimentsOrders1635948948874
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'financial_moviments_orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'financial_moviment_id',
            type: 'int',
          },
          {
            name: 'order_id',
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
      'financial_moviments_orders',
      new TableForeignKey({
        name: 'fk_financial_moviments_orders_financial',
        columnNames: ['financial_moviment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'financial_moviments',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'financial_moviments_orders',
      new TableForeignKey({
        name: 'fk_financial_moviments_orders_orders',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'financial_moviments_orders',
      'fk_financial_moviments_orders_financial',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments_orders',
      'fk_financial_moviments_orders_orders',
    );
    await queryRunner.dropTable('financial_moviments_orders');
  }
}
