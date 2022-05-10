import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClientAccounts1611407325337
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('clients_application');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'clients_application',
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
              type: 'varchar',
            },
            {
              name: 'avatar',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'password',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'cnpj',
              type: 'varchar(18)',
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
              name: 'phone',
              type: 'varchar(20)',
              isNullable: true,
            },
            {
              name: 'mobile',
              type: 'varchar(20)',
              isNullable: true,
            },
            {
              name: 'active',
              type: 'boolean',
              default: true,
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
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('clients_application');
    if (checkIfTableExist) {
      await queryRunner.dropTable('clients_application');
    }
  }
}
