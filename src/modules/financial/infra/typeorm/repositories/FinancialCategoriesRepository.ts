import { getRepository, Repository } from 'typeorm';

import IFinancialCategoriesRepository from '@modules/financial/repositories/IFinancialCategoriesRepository';
import ICreateFinancialCategoryDTO from '@modules/financial/dtos/ICreateFinancialCategoryDTO';

import FinancialCategory from '@modules/financial/infra/typeorm/entities/FinancialCategory';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';

class FinancialCategoriesRepository
  extends MainRepository
  implements IFinancialCategoriesRepository
{
  private ormRepository: Repository<FinancialCategory>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(FinancialCategory);
    super(repository);
    this.ormRepository = repository;
  }

  public async findCategoriesAndSubCategories(): Promise<FinancialCategory[]> {
    this.userData = httpContext.get('user');
    const financialCategories = await this.ormRepository.find({
      where: {
        parent_id: null,
        client_application_id: this.userData.client_application_id,
        active: true,
      },
      relations: ['childCategories'],
    });
    return financialCategories;
  }

  public async findByParentId(parent_id: number): Promise<FinancialCategory[]> {
    this.userData = httpContext.get('user');
    const financialCategories = await this.ormRepository.find({
      where: {
        parent_id,
        client_application_id: this.userData.client_application_id,
        active: true,
      },
    });
    return financialCategories;
  }

  public async create(
    financialCategoryData: ICreateFinancialCategoryDTO,
  ): Promise<FinancialCategory> {
    const financialCategory = this.ormRepository.create(financialCategoryData);

    await this.ormRepository.save(financialCategory);

    return financialCategory;
  }

  public save(
    financialCategory: FinancialCategory,
  ): Promise<FinancialCategory> {
    return this.ormRepository.save(financialCategory);
  }
}

export default FinancialCategoriesRepository;
