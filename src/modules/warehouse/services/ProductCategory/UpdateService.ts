import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
  parent_id?: number;
  name: string;
  generate_revenue: boolean;
}

@injectable()
class UpdateService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    parent_id,
    generate_revenue,
  }: IRequest): Promise<ProductCategory> {
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

    category.name = name;
    category.generate_revenue = generate_revenue;
    category.parent_id = parent_id;

    await this.cacheProvider.invalidate('product-category-list');
    await this.cacheProvider.invalidate(cacheKey);
    if (parent_id) {
      await this.cacheProvider.invalidate(`product-category-get-${parent_id}`);
    }

    await this.productCategoriesRepository.save(category);

    return category;
  }
}

export default UpdateService;
