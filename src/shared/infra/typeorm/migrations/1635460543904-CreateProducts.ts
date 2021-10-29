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
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_category_id',
            type: 'int',
          },
          {
            name: 'side',
            type: 'char(1)',
          },
          {
            name: 'cylindrical',
            type: 'varchar(5)',
          },
          {
            name: 'spherical',
            type: 'varchar(5)',
          },
          {
            name: 'price',
            type: 'varchar(5)',
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
