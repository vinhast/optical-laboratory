import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFinancialMovimentsPayments1653658529483
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'financial_moviments_payments',
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
            name: 'financial_moviment_id',
            type: 'int',
          },
          {
            name: 'payment_gateway_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'payment_method',
            type: 'char(2)',
          },
          {
            name: 'document_number',
            type: 'varchar(20)',
            isNullable: true,
          },

          {
            name: 'digitable_line',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'bar_code',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'situation',
            type: 'enum("Awaiting payment", "Paid", "Cancelled")',
          },
          {
            name: 'nsu_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'due_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'payment_date',
            type: 'datetime',
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
      'financial_moviments_payments',
      new TableForeignKey({
        name: 'fk_financial_moviments_payments_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'financial_moviments_payments',
      new TableForeignKey({
        name: 'fk_financial_moviments_payments_financial_moviments',
        columnNames: ['financial_moviment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'financial_moviments',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'financial_moviments_payments',
      new TableForeignKey({
        name: 'fk_financial_moviments_payments_payment_gateways',
        columnNames: ['payment_gateway_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment_gateways',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'financial_moviments_payments',
      'fk_financial_moviments_payments_payment_gateways',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments_payments',
      'fk_financial_moviments_payments_financial_moviments',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments_payments',
      'fk_financial_moviments_payments_clients_application',
    );
    await queryRunner.dropTable('financial_moviments_payments');
  }
}
