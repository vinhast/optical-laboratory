import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';

interface IRequest {
  id: number;
  parent_id?: number;
  user_id?: number;
  name: string;
  description?: string;
  type?: string;
  ncm?: number;
  cst?: number;
  cfop?: number;
  cfop_out_of_state?: number;
  unit_type_id?: number;
  lense_type?: string;
  lense_side?: string;
  price?: string;
  spherical_start?: number;
  spherical_end?: number;
  cylindrical_start?: number;
  cylindrical_end?: number;
  addition_start?: number;
  addition_end?: number;
  online?: string;
  dir?: number;
  cover?: string;
  tables: SaleTablePrice[];
}

@injectable()
class UpdateService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    productCategoryUpdate: IRequest,
  ): Promise<ProductCategory> {
    const id = productCategoryUpdate.id;
    const parent_id = productCategoryUpdate.parent_id;
    const cacheKey = `product-category-get-${id}`;
    let category = await this.cacheProvider.recover<
      ProductCategory | undefined
    >(cacheKey);

    if (!category) {
      category = await this.productCategoriesRepository.findById(id);
    }

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    category = {
      ...category,
      ...productCategoryUpdate,
    };

    await this.cacheProvider.invalidate('product-category-list');
    await this.cacheProvider.invalidate('product-category-families-list');
    await this.cacheProvider.invalidate(cacheKey);
    if (parent_id) {
      await this.cacheProvider.invalidate(`product-category-get-${parent_id}`);
    }

    await this.productCategoriesRepository.save(category);

    return category;
  }
}

export default UpdateService;
