import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePermissionsRoles1651777420350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfColumnExist = await queryRunner.hasColumn(
      'permissions_roles',
      'id',
    );
    if (!checkIfColumnExist) {
      await queryRunner.addColumns('permissions_roles', [
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
      'permissions_roles',
      'id',
    );
    if (checkIfColumnExist) {
      await queryRunner.dropColumn('permissions_roles', 'id');
    }
  }
}
