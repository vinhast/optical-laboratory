import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentModules1653402668011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('payment_modules');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'payment_modules',
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
              name: 'type',
              type: 'enum("Boleto")',
            },
            {
              name: 'module',
              type: 'varchar',
            },
            {
              name: 'fields',
              type: 'json',
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
    const checkIfTableExist = await queryRunner.hasTable('payment_modules');
    if (checkIfTableExist) {
      await queryRunner.dropTable('payment_modules');
    }
  }
}
