import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserTokens1611407531631
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('user_tokens');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'user_tokens',
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
              name: 'token',
              type: 'varchar',
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
          ],
          foreignKeys: [
            {
              name: 'TokeUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
          ],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('user_tokens');
    if (!checkIfTableExist) {
      await queryRunner.dropTable('user_tokens');
    }
  }
}
