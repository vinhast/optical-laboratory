import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  parent_id?: number;
  generate_revenue: boolean;
}

@injectable()
class CreateService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    parent_id,
    generate_revenue,
  }: IRequest): Promise<ProductCategory> {
    let category = await this.productCategoriesRepository.findByName(name);
    if (category) {
      throw new AppError('Category already exists.');
    }

    category = await this.productCategoriesRepository.create({
      name,
      parent_id,
      generate_revenue,
    });

    await this.cacheProvider.invalidate('product-category-list');
    if (parent_id) {
      await this.cacheProvider.invalidate(`product-category-get-${parent_id}`);
    }

    return category;
  }
}

export default CreateService;
