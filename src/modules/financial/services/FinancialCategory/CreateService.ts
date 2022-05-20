import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import FinancialCategory, {
  FinancialCategoryType,
} from '@modules/financial/infra/typeorm/entities/FinancialCategory';
import IFinancialCategoriesRepository from '@modules/financial/repositories/IFinancialCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  parent_id?: number;
  type: FinancialCategoryType;
}

@injectable()
class CreateService {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    parent_id,
    type,
  }: IRequest): Promise<FinancialCategory> {
    let category = await this.financialCategoriesRepository.findByName(
      name,
      parent_id,
    );
    if (category) {
      throw new AppError('Category already exists.');
    }

    category = await this.financialCategoriesRepository.create({
      name,
      parent_id,
      type,
    });

    await this.cacheProvider.invalidate('financial-category-list');
    await this.cacheProvider.invalidate('financial-categories');
    if (parent_id) {
      await this.cacheProvider.invalidate(
        `financial-category-get-${parent_id}`,
      );
    }

    return category;
  }
}

export default CreateService;
