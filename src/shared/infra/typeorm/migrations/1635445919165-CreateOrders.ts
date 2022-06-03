import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrders1635445919165 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
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
            name: 'os',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'client_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'products_value',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'service_value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lenses_value',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'charged_value',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'credit_value',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'shipping_method',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'shipping_value',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'shipping_time',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'payment_method',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'payment_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'installments',
            type: 'int',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'type',
            type: 'char(1)',
            default: '"V"',
          },
          {
            name: 'profit',
            type: 'char(1)',
            default: '"N"',
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'revenue',
            type: 'json',
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
      'orders',
      new TableForeignKey({
        name: 'fk_orders_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'fk_orders_clients',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'fk_orders_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'fk_orders_clients');
    await queryRunner.dropForeignKey('orders', 'fk_orders_users');
    await queryRunner.dropTable('orders');
  }
}
