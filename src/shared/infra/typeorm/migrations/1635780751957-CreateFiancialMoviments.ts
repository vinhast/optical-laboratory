import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFiancialMoviments1635780751957
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'financial_moviments',
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
            name: 'client_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'provider_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'int',
          },
          {
            name: 'sub_category_id',
            type: 'int',
          },
          {
            name: 'bank_account_id',
            type: 'int',
            default: '1',
          },
          {
            name: 'shipment_file_id',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'description',
            type: 'longtext',
          },
          {
            name: 'due_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'decimal(10,2)',
          },
          {
            name: 'products_value',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'services_value',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'credits_value',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'fees_fines_value',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'nf_code',
            type: 'varchar(150)',
            isNullable: true,
          },
          {
            name: 'nf_receipt',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'nf_receipt_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'nf_issue_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'nf_cStat_receipt',
            type: 'varchar(5)',
            isNullable: true,
          },
          {
            name: 'nf_xmotivo_receipt',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'nf_number',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'nf_key',
            type: 'varchar(50)',
            isNullable: true,
          },

          {
            name: 'nf_protocoll',
            type: 'varchar(20)',
            isNullable: true,
          },

          {
            name: 'nf_protocoll_date',
            type: 'char(26)',
            isNullable: true,
          },
          {
            name: 'nf_protocoll_menssage',
            type: 'varchar(200)',
            isNullable: true,
          },

          {
            name: 'nf_year_month',
            type: 'varchar(6)',
            isNullable: true,
          },

          {
            name: 'nf_lot',
            type: 'varchar(45)',
            isNullable: true,
          },

          {
            name: 'nf_canceled',
            type: 'char(1)',
            isNullable: true,
          },
          {
            name: 'nf_canceled_protocoll',
            type: 'varchar(20)',
            isNullable: true,
          },

          {
            name: 'nf_canceled_date',
            type: 'char(26)',
            isNullable: true,
          },
          {
            name: 'nf_canceled_reason',
            type: 'varchar(255)',
            isNullable: true,
          },

          {
            name: 'nf_status',
            type: 'enum("Wainting", "Issued", "Canceled")',
            default: '"Wainting"',
          },

          {
            name: 'nfse_number',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'nfse_verification_code',
            type: 'varchar(20)',
            isNullable: true,
          },

          {
            name: 'nfse_issue_date',
            type: 'datetime',
            isNullable: true,
          },

          {
            name: 'nfse_rps_number',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'nfse_canceled',
            type: 'char(1)',
            isNullable: true,
          },

          {
            name: 'nfse_status',
            type: 'char(1)',
            default: '"N"',
          },

          {
            name: 'finished',
            type: 'char(2)',
            default: '"N"',
          },
          {
            name: 'payment_method',
            type: 'char(2)',
            isNullable: true,
          },
          {
            name: 'payment_method_text',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'invoice_status',
            type: 'char(1)',
            isNullable: true,
          },

          {
            name: 'invoice_registered',
            type: 'char(1)',
            isNullable: true,
          },
          {
            name: 'invoice_bank_downloaded',
            type: 'char(1)',
            isNullable: true,
          },

          {
            name: 'operation_type',
            type: 'char(1)',
          },

          {
            name: 'generated_user_id',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'downloaded_user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'payment_gateway_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'downloaded_at',
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
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_generated_user',
        columnNames: ['generated_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_applications_users',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_downloaded_user_id',
        columnNames: ['downloaded_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_applications_users',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_clients',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_financial_providers',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_payment_gateways',
        columnNames: ['payment_gateway_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment_gateways',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_financial_categories_category',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'financial_categories',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'financial_moviments',
      new TableForeignKey({
        name: 'fk_financial_moviments_financial_categories_sub_category',
        columnNames: ['sub_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'financial_categories',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_financial_categories_sub_category',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_financial_categories_category',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_payment_gateways',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_financial_providers',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_clients_application',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_clients',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_types',
    );
    await queryRunner.dropForeignKey(
      'financial_moviments',
      'fk_financial_moviments_financial_providers',
    );
    await queryRunner.dropTable('financial_moviments');
  }
}
