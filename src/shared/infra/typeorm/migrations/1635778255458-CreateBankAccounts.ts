import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBankAccounts1635778255458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bank_accounts',
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
            name: 'name',
            type: 'varchar(100)',
          },
          {
            name: 'registry',
            type: 'char(1)',
            isNullable: true,
          },
          {
            name: 'agency',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'account',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'account_dv',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'client_code',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'assignor_code',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'assignor_code_dv',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'document',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'transmission_code',
            type: 'varchar(25)',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'varchar(2)',
            isNullable: true,
          },
          {
            name: 'invoice_value',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'delay_fines',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'delay_taxes',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'message_1',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'message_2',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'message_3',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'instruction_1',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'instruction_2',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'instruction_3',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'char(1)',
            default: '"S"',
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
      'bank_accounts',
      new TableForeignKey({
        name: 'fk_bank_accounts_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bank_accounts');
  }
}
