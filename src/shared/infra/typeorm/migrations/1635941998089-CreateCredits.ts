import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCredits1635941998089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'credits',
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
          },
          {
            name: 'order_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'value',
            type: 'varchar(10)',
          },
          {
            name: 'date',
            type: 'datetime',
          },
          {
            name: 'used',
            type: 'char(1)',
            default: '"N"',
          },
          {
            name: 'used_at',
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
      'credits',
      new TableForeignKey({
        name: 'fk_credits_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'credits',
      new TableForeignKey({
        name: 'fk_credits_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('credits', 'fk_credits_users');
    await queryRunner.dropTable('credits');
  }
}
