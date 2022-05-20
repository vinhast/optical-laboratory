import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import FinancialCategory from '@modules/financial/infra/typeorm/entities/FinancialCategory';
import IFinancialCategoriesRepository from '@modules/financial/repositories/IFinancialCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<FinancialCategory> {
    const cacheKey = `financial-category-get-${id}`;
    let category = await this.cacheProvider.recover<
      FinancialCategory | undefined
    >(cacheKey);

    if (!category) {
      category = await this.financialCategoriesRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(category));
    }

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    return category;
  }
}

export default GetService;
