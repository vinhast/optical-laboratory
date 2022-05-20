import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFinancialCategoriesRepository from '@modules/financial/repositories/IFinancialCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const cacheKey = `financial-category-get-${id}`;
    const category = await this.financialCategoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    await this.cacheProvider.invalidate(`financial-category-list`);
    await this.cacheProvider.invalidate('financial-categories');
    await this.cacheProvider.invalidate(cacheKey);
    if (category.parent_id) {
      await this.cacheProvider.invalidate(
        `financial-category-get-${category.parent_id}`,
      );
    }

    await this.financialCategoriesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
