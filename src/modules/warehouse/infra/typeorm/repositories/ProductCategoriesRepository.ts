/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getRepository, IsNull, Repository } from 'typeorm';

import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICreateProductCategoryDTO from '@modules/warehouse/dtos/ICreateProductCategoryDTO';

import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import httpContext from 'express-http-context';

class ProductCategoriesRepository
  extends MainRepository
  implements IProductCategoriesRepository
{
  private myUser: {
    id: number;
    client_application_id: number;
    role_id: number;
  };
  private ormRepository: Repository<ProductCategory>;
  private ormSalesTablesPricesRepository: Repository<SaleTablePrice>;

  constructor() {
    const repository = getRepository(ProductCategory);
    super(repository);
    this.ormRepository = repository;
    this.ormSalesTablesPricesRepository = getRepository(SaleTablePrice);
    this.myUser = httpContext.get('user');
  }

  public async findAll(parent_id?: string): Promise<any[]> {
    let items = await this.ormRepository.find({
      where: {
        client_application_id: this.myUser.client_application_id,
      },
    });
    if (parent_id === 'null') {
      items = await this.ormRepository.find({
        where: {
          client_application_id: this.myUser.client_application_id,
          parent_id: IsNull(),
        },
      });
    }
    return items;
  }

  public async findById(id: number): Promise<any | undefined> {
    const productCategory = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id: this.myUser.client_application_id,
      },
    });
    const tables = await this.ormSalesTablesPricesRepository.find({
      where: {
        client_application_id: this.myUser.client_application_id,
        product_category_id: productCategory?.id,
      },
    });
    return {
      ...productCategory,
      tables,
    };
  }

  public async create(
    productCategoryData: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const productCategory = this.ormRepository.create(productCategoryData);

    await this.ormRepository.save(productCategory);
    if (productCategoryData.tables) {
      for (const table of productCategoryData.tables) {
        await this.ormSalesTablesPricesRepository.save({
          ...table,
          product_category_id: productCategory.id,
          user_id: this.myUser.id,
        });
      }
    }

    return productCategory;
  }

  public async save(
    productCategoryData: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const productCategory = await this.ormRepository.save(productCategoryData);
    if (productCategoryData.tables) {
      const tables = await this.ormSalesTablesPricesRepository.find({
        where: {
          client_application_id: this.myUser.client_application_id,
          product_category_id: productCategory?.id,
        },
      });

      for (const table of productCategoryData.tables) {
        const find = tables.find(
          t =>
            Number(t.client_application_id) ===
              Number(this.myUser.client_application_id) &&
            Number(t.table_id) === Number(table.table_id) &&
            Number(t.product_category_id) === Number(productCategory.id),
        );
        await this.ormSalesTablesPricesRepository.save({
          ...find,
          ...table,
          product_category_id: productCategory.id,
          user_id: this.myUser.id,
        });
      }
    }
    return productCategory;
  }
}

export default ProductCategoriesRepository;
