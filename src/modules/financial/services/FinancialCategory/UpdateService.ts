import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import FinancialCategory, {
  FinancialCategoryType,
} from '@modules/financial/infra/typeorm/entities/FinancialCategory';
import IFinancialCategoriesRepository from '@modules/financial/repositories/IFinancialCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
  parent_id?: number;
  name: string;
  type: FinancialCategoryType;
}

@injectable()
class UpdateService {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    parent_id,
    name,
    type,
  }: IRequest): Promise<FinancialCategory> {
    const cacheKey = `financial-category-get-${id}`;
    let category = await this.cacheProvider.recover<
      FinancialCategory | undefined
    >(cacheKey);

    if (!category) {
      category = await this.financialCategoriesRepository.findById(id);
    }

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    category.name = name;
    category.parent_id = parent_id;
    category.type = type;

    if (!parent_id) {
      const subCategories =
        await this.financialCategoriesRepository.findByParentId(id);
      // eslint-disable-next-line no-restricted-syntax
      for (const subCategory of subCategories) {
        subCategory.type = type;
        // eslint-disable-next-line no-await-in-loop
        await this.financialCategoriesRepository.save(subCategory);
      }
    }

    await this.cacheProvider.invalidate(`financial-category-list`);
    await this.cacheProvider.invalidate('financial-categories');
    await this.cacheProvider.invalidate(cacheKey);
    if (parent_id) {
      await this.cacheProvider.invalidate(
        `financial-category-get-${parent_id}`,
      );
    }

    await this.financialCategoriesRepository.save(category);

    return category;
  }
}

export default UpdateService;
