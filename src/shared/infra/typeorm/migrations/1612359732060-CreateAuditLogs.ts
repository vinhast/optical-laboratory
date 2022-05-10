import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAuditLogs1612359732060
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('audit_logs');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'audit_logs',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'type',
              type: 'varchar',
            },
            {
              name: 'entity',
              type: 'varchar',
            },
            {
              name: 'entity_id',
              type: 'int',
            },
            {
              name: 'descriptions',
              type: 'longtext',
              isNullable: true,
            },
            {
              name: 'changes',
              type: 'json',
              isNullable: true,
            },
            {
              name: 'user_id',
              type: 'int',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
      await queryRunner.createForeignKey(
        'audit_logs',
        new TableForeignKey({
          name: 'fk_audit_log_user',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('audit_logs');
    if (checkIfTableExist) {
      await queryRunner.dropForeignKey('audit_logs', 'fk_audit_log_user');
      await queryRunner.dropTable('audit_logs');
    }
  }
}
