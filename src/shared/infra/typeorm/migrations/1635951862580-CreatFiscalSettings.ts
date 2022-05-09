import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatFiscalSettings1635951862580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fiscal_settings',
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
      'fiscal_settings',
      new TableForeignKey({
        name: 'fk_fiscal_settings_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fiscal_settings');
  }
}
