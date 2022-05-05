import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePermissionsUsers1651777594610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfColumnExist = await queryRunner.hasColumn(
      'permissions_users',
      'id',
    );
    if (!checkIfColumnExist) {
      await queryRunner.addColumns('permissions_users', [
        new TableColumn({
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        }),
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfColumnExist = await queryRunner.hasColumn(
      'permissions_users',
      'id',
    );
    if (checkIfColumnExist) {
      await queryRunner.dropColumn('permissions_users', 'id');
    }
  }
}
