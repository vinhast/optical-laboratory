import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePaymentGateways1635780691000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('payment_gateways');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'payment_gateways',
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
              name: 'type',
              type: 'enum("Boleto")',
            },
            {
              name: 'payment_module_id',
              type: 'int',
            },
            {
              name: 'credentials',
              type: 'json',
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
        'payment_gateways',
        new TableForeignKey({
          name: 'fk_payment_gateways_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );
      await queryRunner.createForeignKey(
        'payment_gateways',
        new TableForeignKey({
          name: 'fk_payment_gateways_payment_modules',
          columnNames: ['payment_module_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'payment_modules',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('payment_gateways');
    if (checkIfTableExist) {
      await queryRunner.dropForeignKey(
        'payment_gateways',
        'fk_payment_gateways_payment_modules',
      );
      await queryRunner.dropForeignKey(
        'payment_gateways',
        'fk_payment_gateways_clients_application',
      );
      await queryRunner.dropTable('payment_gateways');
    }
  }
}
