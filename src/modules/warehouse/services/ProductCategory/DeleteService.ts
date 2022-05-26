import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const cacheKey = `product-category-get-${id}`;
    const category = await this.productCategoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    await this.cacheProvider.invalidate(`product-categories-list`);
    await this.cacheProvider.invalidate(`product-categories-families-list`);
    await this.cacheProvider.invalidate(cacheKey);
    if (category.parent_id) {
      await this.cacheProvider.invalidate(
        `product-category-get-${category.parent_id}`,
      );
    }

    await this.productCategoriesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
