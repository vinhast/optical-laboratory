import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatInvoiceSettigs1635951862580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoice_settings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'company_name',
            type: 'varchar(100)',
          },
          {
            name: 'cnpj',
            type: 'char(14)',
          },
          {
            name: 'city_registration',
            type: 'varchar(20)',
          },
          {
            name: 'state_registration',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'text',
          },
          {
            name: 'nfse_env',
            type: 'boolean',
            default: '1',
          },
          {
            name: 'nfse_rps_number',
            type: 'int',
            default: '0',
          },
          {
            name: 'certified_file',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'certified_validate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'certified_password',
            type: 'varchar(100)',
          },
          {
            name: 'nf_emission_due',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dir',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'invoice_email_copy',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'char(1)',
            default: '"1"',
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
    await queryRunner.dropTable('invoice_settings');
  }
}
