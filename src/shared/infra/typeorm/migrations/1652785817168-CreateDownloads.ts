import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDownloads1652785817168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('downloads');
    if (!checkIfTableExist) {
      await queryRunner.createTable(
        new Table({
          name: 'downloads',
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
              name: 'title',
              type: 'varchar(100)',
            },
            {
              name: 'description',
              type: 'longtext',
            },
            {
              name: 'dir',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'attachment',
              type: 'varchar(100)',
              isNullable: true,
            },
            {
              name: 'active',
              type: 'tinyint(2)',
              default: '1',
            },
            {
              name: 'user_id',
              type: 'int',
              isNullable: true,
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

      await queryRunner.createForeignKeys('downloads', [
        new TableForeignKey({
          name: 'fk_downloads_users',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
        new TableForeignKey({
          name: 'fk_downloads_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkIfTableExist = await queryRunner.hasTable('downloads');
    if (checkIfTableExist) {
      await queryRunner.dropForeignKeys('downloads', [
        new TableForeignKey({
          name: 'fk_downloads_users',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
        new TableForeignKey({
          name: 'fk_downloads_clients_application',
          columnNames: ['client_application_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'clients_application',
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        }),
      ]);
      await queryRunner.dropTable('downloads');
    }
  }
}
