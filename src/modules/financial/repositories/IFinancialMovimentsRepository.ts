import ICreateFinancialMovimentDTO from '../dtos/ICreateFinancialMovimentDTO';
import FinancialMoviment from '../infra/typeorm/entities/FinancialMoviment';

export default interface IFinancialMovimentsRepository {
  findAll(): Promise<FinancialMoviment[]>;
  findById(id: number): Promise<FinancialMoviment | undefined>;
  create(
    FinancialMoviment: ICreateFinancialMovimentDTO,
  ): Promise<FinancialMoviment>;
  save(FinancialMoviment: FinancialMoviment): Promise<FinancialMoviment>;
  delete(id: number): Promise<void>;
}
