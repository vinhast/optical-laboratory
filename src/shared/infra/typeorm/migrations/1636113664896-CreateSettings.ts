import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSettings1636113664896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'setting',
            type: 'varchar(10)',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'varchar(10)',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('settings');
  }
}
