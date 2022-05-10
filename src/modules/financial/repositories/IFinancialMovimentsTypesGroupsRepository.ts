import ICreateFinancialMovimentTypeGroupDTO from '../dtos/ICreateFinancialMovimentTypeGroupDTO';
import FinancialMovimentTypeGroup from '../infra/typeorm/entities/FinancialMovimentTypeGroup';

export default interface IFinancialMovimentsTypesGroupsRepository {
  findAll(): Promise<FinancialMovimentTypeGroup[]>;
  findById(id: number): Promise<FinancialMovimentTypeGroup | undefined>;
  create(
    FinancialMovimentTypeGroup: ICreateFinancialMovimentTypeGroupDTO,
  ): Promise<FinancialMovimentTypeGroup>;
  save(
    FinancialMovimentTypeGroup: FinancialMovimentTypeGroup,
  ): Promise<FinancialMovimentTypeGroup>;
  delete(id: number): Promise<void>;
}
