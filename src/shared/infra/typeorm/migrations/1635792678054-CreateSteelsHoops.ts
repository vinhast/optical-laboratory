import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSteelsHoops1635792678054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'steels_hoops',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'hoop_id',
            type: 'int',
          },
          {
            name: 'steel_id',
            type: 'int',
          },
          {
            name: '_create',
            type: 'varchar(2)',
            default: '"0"',
          },
          {
            name: '_read',
            type: 'varchar(2)',
            default: '"0"',
          },
          {
            name: '_update',
            type: 'varchar(2)',
            default: '"0"',
          },
          {
            name: '_delete',
            type: 'varchar(2)',
            default: '"0"',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('steels_hoops');
  }
}
