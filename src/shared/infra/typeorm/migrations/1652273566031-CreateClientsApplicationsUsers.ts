import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClientsApplicationsUsers1652273566031
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'clients_applications_users',
    );
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'clients_applications_users',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'client_application_id',
              type: 'int',
            },
            {
              name: 'username',
              type: 'varchar',
            },
            {
              name: 'password',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'active',
              type: 'boolean',
              default: true,
            },
            {
              name: 'role_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'user_token',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'user_token_validate',
              type: 'int',
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
        'clients_applications_users',
        new TableForeignKey({
          name: 'fk_clients_applications_users_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable(
      'clients_applications_users',
    );
    if (checkIfTableExist) {
      await queryRunner.dropTable('clients_applications_users');
    }
  }
}
