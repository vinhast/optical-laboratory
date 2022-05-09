import ICreateFinancialMovimentOrderDTO from '../dtos/ICreateFinancialMovimentOrderDTO';
import FinancialMovimentOrder from '../infra/typeorm/entities/FinancialMovimentOrder';

export default interface IFinancialMovimentsOrdersRepository {
  findAll(): Promise<FinancialMovimentOrder[]>;
  findById(id: number): Promise<FinancialMovimentOrder | undefined>;
  create(
    FinancialMovimentOrder: ICreateFinancialMovimentOrderDTO,
  ): Promise<FinancialMovimentOrder>;
  save(
    FinancialMovimentOrder: FinancialMovimentOrder,
  ): Promise<FinancialMovimentOrder>;
  delete(id: number): Promise<void>;
}
