import { inject, injectable } from 'tsyringe';

import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class ListService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(parent_id?: string): Promise<ProductCategory[]> {
    const cacheKey = `product-categories-families-list`;
    let productCategories = await this.cacheProvider.recover<ProductCategory[]>(
      cacheKey,
    );

    if (!productCategories) {
      productCategories = await this.productCategoriesRepository.findAll(
        parent_id,
      );
      await this.cacheProvider.save(cacheKey, classToClass(productCategories));
    }

    return productCategories;
  }
}

export default ListService;
