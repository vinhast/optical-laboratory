import ICreateFinancialMovimentPaymentDTO from '../dtos/ICreateFinancialMovimentPaymentDTO';
import FinancialMovimentPayment from '../infra/typeorm/entities/FinancialMovimentPayment';

export default interface IFinancialMovimentPaymentsRepository {
  findAll(): Promise<FinancialMovimentPayment[]>;
  findById(id: number): Promise<FinancialMovimentPayment | undefined>;
  findByFinancialMovimentId(
    financial_moviment_id: number,
  ): Promise<FinancialMovimentPayment | undefined>;
  create(
    financialMovimentPayment: ICreateFinancialMovimentPaymentDTO,
  ): Promise<FinancialMovimentPayment>;
  save(
    financialMovimentPayment: FinancialMovimentPayment,
  ): Promise<FinancialMovimentPayment>;
  delete(id: number): Promise<void>;
}
