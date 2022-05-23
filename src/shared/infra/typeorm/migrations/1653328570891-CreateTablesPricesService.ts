import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTablesPricesService1653328570891
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales_tables_prices_services',
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
            name: 'service_id',
            type: 'int',
          },
          {
            name: 'table_id',
            type: 'int',
          },
          {
            name: 'price',
            type: 'varchar(10)',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
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
      'sales_tables_prices_services',
      new TableForeignKey({
        name: 'fk_sales_tables_prices_services_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'sales_tables_prices_services',
      new TableForeignKey({
        name: 'fk_sales_tables_prices_services_services',
        columnNames: ['service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'services',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'sales_tables_prices_services',
      'fk_sales_tables_prices_services_clients_application',
    );
    await queryRunner.dropForeignKey(
      'sales_tables_prices_services',
      'fk_sales_tables_prices_services_services',
    );
    await queryRunner.dropTable('sales_tables_prices_services');
  }
}
