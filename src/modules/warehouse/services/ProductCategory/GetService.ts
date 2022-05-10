import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<ProductCategory> {
    const cacheKey = `product-category-get-${id}`;
    let category = await this.cacheProvider.recover<
      ProductCategory | undefined
    >(cacheKey);

    if (!category) {
      category = await this.productCategoriesRepository.findById(id);
      await this.cacheProvider.save(cacheKey, classToClass(category));
    }

    if (!category) {
      throw new AppError('Categoty not found.', 404);
    }
    return category;
  }
}

export default GetService;
