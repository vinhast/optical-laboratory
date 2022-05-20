import FinancialCategory from '@modules/financial/infra/typeorm/entities/FinancialCategory';
import ICreateFinancialCategoryDTO from '@modules/financial/dtos/ICreateFinancialCategoryDTO';

export default interface IFinancialCategoriesRepository {
  findAll(): Promise<FinancialCategory[]>;
  findCategoriesAndSubCategories(): Promise<FinancialCategory[]>;
  findById(id: number): Promise<FinancialCategory | undefined>;
  findByParentId(parent_id: number): Promise<FinancialCategory[]>;
  findByName(
    name: string,
    parent_id?: number,
  ): Promise<FinancialCategory | undefined>;
  create(data: ICreateFinancialCategoryDTO): Promise<FinancialCategory>;
  save(financialCategory: FinancialCategory): Promise<FinancialCategory>;
  delete(id: number): Promise<void>;
}
