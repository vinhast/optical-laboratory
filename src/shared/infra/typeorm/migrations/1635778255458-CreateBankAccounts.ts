import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            isGenerated: true,
            generationStrategy: 'increment',
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
    await queryRunner.dropTable('bank_accounts');
  }
}
