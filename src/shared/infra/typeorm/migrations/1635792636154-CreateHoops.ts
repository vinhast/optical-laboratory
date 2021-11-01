import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHoops1635792636154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hoops',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'parent_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'model',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'foreign_key',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'alias',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'lft',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'rght',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('hoops');
  }
}
