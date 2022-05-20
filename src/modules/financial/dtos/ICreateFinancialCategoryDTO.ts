import { FinancialCategoryType } from '../infra/typeorm/entities/FinancialCategory';

export default interface ICreateFinancialCategoryDTO {
  name: string;
  parent_id: number | undefined;
  type: FinancialCategoryType;
}
