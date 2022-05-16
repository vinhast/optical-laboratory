import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClients1635444862016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
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
            name: 'table_id',
            type: 'int',
          },
          {
            name: 'company_name',
            type: 'varchar(100)',
          },
          {
            name: 'company_social_name',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'cnpj',
            type: 'varchar(18)',
          },
          {
            name: 'state_registration',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'city_registration',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar(2)',
            isNullable: true,
          },
          {
            name: 'zip_code',
            type: 'varchar(9)',
            isNullable: true,
          },
          {
            name: 'ibge',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'phone_1',
            type: 'char(14)',
            isNullable: true,
          },
          {
            name: 'phone_2',
            type: 'char(14)',
            isNullable: true,
          },
          {
            name: 'mobile',
            type: 'char(14)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'shipment_method',
            type: 'varchar(2)',
            isNullable: true,
          },
          {
            name: 'payment_method',
            type: 'varchar(2)',
            isNullable: true,
          },
          {
            name: 'payment_day',
            type: 'char(2)',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'char(1)',
            default: '"S"',
          },
          {
            name: 'cnpjSearch',
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
      'clients',
      new TableForeignKey({
        name: 'fk_clients_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
