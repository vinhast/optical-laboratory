import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FinancialCategory from '@modules/financial/infra/typeorm/entities/FinancialCategory';
import IFinancialCategoriesRepository from '@modules/financial/repositories/IFinancialCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<FinancialCategory[]> {
    const cacheKey = `financial-category-list`;
    let categories = await this.cacheProvider.recover<FinancialCategory[]>(
      cacheKey,
    );

    if (!categories) {
      categories = await this.financialCategoriesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(categories));
    }

    return categories;
  }
}

export default ListService;
