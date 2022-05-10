import ICreateFinancialMovimentTypeDTO from '../dtos/ICreateFinancialMovimentTypeDTO';
import FinancialMovimentType from '../infra/typeorm/entities/FinancialMovimentType';

export default interface IFinancialMovimentsTypesRepository {
  findAll(): Promise<FinancialMovimentType[]>;
  findById(id: number): Promise<FinancialMovimentType | undefined>;
  create(
    FinancialMovimentType: ICreateFinancialMovimentTypeDTO,
  ): Promise<FinancialMovimentType>;
  save(
    FinancialMovimentType: FinancialMovimentType,
  ): Promise<FinancialMovimentType>;
  delete(id: number): Promise<void>;
}
