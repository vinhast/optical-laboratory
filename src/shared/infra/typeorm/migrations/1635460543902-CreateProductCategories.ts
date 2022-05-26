import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductCategories1635460543902
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_categories',
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
            name: 'parent_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar(50)',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'ncm',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'cst',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'cfop',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'cfop_out_of_state',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'unit_type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'lense_type',
            type: 'char(1)',
            isNullable: true,
          },
          {
            name: 'lense_side',
            type: 'char(1)',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'spherical_start',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'spherical_end',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'cylindrical_start',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'cylindrical_end',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'addition_start',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'addition_end',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'online',
            type: 'char(1)',
            isNullable: true,
          },
          {
            name: 'dir',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'cover',
            type: 'varchar',
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
    await queryRunner.createForeignKey(
      'product_categories',
      new TableForeignKey({
        name: 'fk_product_categories_clients_application',
        columnNames: ['client_application_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients_application',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_categories',
      new TableForeignKey({
        name: 'fk_product_categories_sub',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_categories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'product_categories',
      'fk_product_categories_sub',
    );
    await queryRunner.dropTable('product_categories');
  }
}
