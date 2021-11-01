import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShipmentFiles1635779762475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shipment_files',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'sent',
            type: 'char(1)',
            default: '"N"',
          },
          {
            name: 'sent_at',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('shipment_files', '');
    await queryRunner.dropTable('shipment_files');
  }
}
