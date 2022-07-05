import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProducts1635460543904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
            name: 'product_category_id',
            type: 'int',
          },
          {
            name: 'side',
            type: 'char(1)',
            isNullable: true,
          },
          {
            name: 'cylindrical',
            type: 'varchar(6)',
            isNullable: true,
          },
          {
            name: 'spherical',
            type: 'varchar(6)',
            isNullable: true,
          },
          {
            name: 'addition',
            type: 'varchar(6)',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'bars_code',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'char(1)',
            default: '"S"',
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
      'products',
      new TableForeignKey({
        name: 'fk_products_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'fk_products_product_categories',
        columnNames: ['product_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_categories',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'products',
      'fk_products_product_categories',
    );
    await queryRunner.dropTable('products');
  }
}
