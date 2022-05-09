import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProviders1635462808434 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers',
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
            type: 'varchar(200)',
          },
          {
            name: 'company_social_name',
            type: 'varchar(200)',
          },
          {
            name: 'cnpj',
            type: 'varchar(18)',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'char(2)',
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
            name: 'phone',
            type: 'char(13)',
            isNullable: true,
          },
          {
            name: 'mobile',
            type: 'char(13)',
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
      'providers',
      new TableForeignKey({
        name: 'fk_providers_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('providers');
  }
}
